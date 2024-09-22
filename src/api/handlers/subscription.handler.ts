import paymentGateway from "../../services/paymentGateway";
import { ETypeSubscription } from "../../database/postgres/interface/subscription.interface";
import ISubscriptionHandler from "./interface/subscriptionHandler.interface";
import Stripe from "stripe";
import userRepository from "../../database/postgres/respositories/user.repository";

class SubscriptionHandler implements ISubscriptionHandler {
  stripe: Stripe;
  constructor() {
    this.stripe = paymentGateway.setup();
  }
  async subscribePlan(userId: string, priceId: string, type: ETypeSubscription): Promise<string> {
    try {
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }

      let newCustomerId;
      if (user.stripeCustomerId) {
        const customer = await this.stripe.customers.retrieve(user.stripeCustomerId);
        if (!customer) {
          const newCustomer = await this.stripe.customers.create({
            name: user.userName,
            email: user.email,
            metadata: { userId },
          });
          newCustomerId = newCustomer.id;
        } else {
          newCustomerId = user.stripeCustomerId;
        }
      }

      const baseUrl = `${process.env.CLIENT_BASE_URL}/subscriptions`;
      console.log('baseUrl', baseUrl)
      const session = await this.stripe.checkout.sessions.create({
        mode: "subscription",
        success_url: `${baseUrl}/?status=success`,
        cancel_url: `${baseUrl}/?status=failure`,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer: newCustomerId,
        metadata: {
          type,
          userId,
        },
      });

      return session.url;
    } catch (error) {
      throw error;
    }
  }
}

export default new SubscriptionHandler();
