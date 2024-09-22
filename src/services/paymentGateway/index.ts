import Stripe from "stripe";

class PaymentGateway {
  stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  setup() {
    return this.stripe;
  }
}

export default new PaymentGateway();
