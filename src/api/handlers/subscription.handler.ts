import paymentGateway from "../../services/paymentGateway";
import { ETypeSubscription } from "../../database/postgres/interface/subscription.interface";
import ISubscriptionHandler from "./interface/subscriptionHandler.interface";
import Stripe from "stripe";
import userRepository from "../../database/postgres/repositories/user.repository";
import subscriptionRepository from "../../database/postgres/repositories/subscription.repository";

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

      // **** CREATE NEW CUSTOMER ****
      let newCustomerId;
      if (!user.stripeCustomerId) {
        const newCustomer = await this.stripe.customers.create({
          name: user.userName,
          email: user.email,
          metadata: { userId },
        });
        newCustomerId = newCustomer.id;
      } else {
        newCustomerId = user.stripeCustomerId;
      }

      // **** CREATE NEW SUBSCRIPTION ****
      const currentDate = new Date();
      const expiredDate = currentDate.setMonth(currentDate.getMonth() + 1);
      const newSubscription = await subscriptionRepository.create({
        type,
        user,
        expiredAt: new Date(expiredDate),
      });

      // **** CREATE CHECKOUT SESSION ****
      const baseUrl = `${process.env.CLIENT_BASE_URL}/subscriptions`;
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
          subscriptionId: newSubscription.id,
        },
        subscription_data: {
          metadata: {
            subscriptionId: newSubscription.id,
          },
        },
      });

      return session.url;
    } catch (error) {
      throw error;
    }
  }
}

export default new SubscriptionHandler();
