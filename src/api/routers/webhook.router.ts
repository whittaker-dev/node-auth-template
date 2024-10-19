import express, { Router } from "express";
import Stripe from "stripe";
import paymentGateway from "../../services/paymentGateway";
import { IRouter } from "./interface";
import userRepository from "../../database/postgres/repositories/user.repository";
import subscriptionRepository from "../../database/postgres/repositories/subscription.repository";
import { ESubscriptionStatus } from "../../database/postgres/interface/subscription.interface";

const router = Router();

class WebhookRouter implements IRouter {
  stripe: Stripe;
  constructor() {
    this.stripe = paymentGateway.stripe;
  }
  get routes() {
    router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
      const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
      let event = req.body as Stripe.Event;

      if (endpointSecret) {
        const signature = req.headers["stripe-signature"];
        try {
          event = this.stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`, err.message);
          return res.sendStatus(400);
        }
      }

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;
          console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
          break;
        case "customer.created":
          const customerData = event.data.object;
          await userRepository.update({
            id: customerData.metadata.userId,
            stripeCustomerId: customerData.id,
          });

          break;
        case "checkout.session.completed":
          const checkoutData = event.data.object;
          const { subscriptionId } = checkoutData.metadata;
          await subscriptionRepository.update({ id: subscriptionId, status: ESubscriptionStatus.Active });
          break;
        case "customer.subscription.created":
          const subscriptionCreated = event.data.object;
          await this.stripe.subscriptions.update(subscriptionCreated.id, { cancel_at_period_end: true });
          await subscriptionRepository.update({
            id: subscriptionCreated.metadata.subscriptionId,
            stripeSubscriptionId: subscriptionCreated.id,
          });

          break;
        case "customer.subscription.updated":
          const subscriptionUpdated = event.data.object;
          console.log("subscriptionUpdated", subscriptionUpdated);
          break;
        case "customer.subscription.deleted":
          const subscriptionDeleted = event.data.object;
          console.log("subscriptionDeleted", subscriptionDeleted);
          await subscriptionRepository.updateByStripe(subscriptionId, {
            status: ESubscriptionStatus.Cancelled,
            expiredAt: null,
          });
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.sendStatus(200);
    });
    return router;
  }
}

export default new WebhookRouter();
