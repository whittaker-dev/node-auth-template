import { ETypeSubscription } from "../../../database/postgres/interface/subscription.interface";

export default interface ISubscriptionHandler {
  subscribePlan(userId: string, priceId: string, type: ETypeSubscription): Promise<string>;
}
