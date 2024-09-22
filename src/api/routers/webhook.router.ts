import express, { Router } from "express";
import Stripe from "stripe";
import paymentGateway from "../../services/paymentGateway";
import { IRouter } from "./interface";

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
        case "payment_method.attached":
          const paymentMethod = event.data.object;
          break;
        case "checkout.session.async_payment_succeeded":
          const checkoutData = event.data.object;
          console.log(">>>> Checkout data", checkoutData);
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
