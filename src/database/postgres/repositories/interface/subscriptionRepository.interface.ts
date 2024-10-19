import { UpdateResult } from "typeorm";
import { SubscriptionPlan } from "../../entities/subscriptionPlan.entity";
import { User } from "../../entities/user.entity";
import { ETypeSubscription } from "../../interface/subscription.interface";

export interface IDataCreateSubscription {
  type: ETypeSubscription;
  user: User;
  expiredAt: Date;
}

export interface ISubscriptionRepository {
  create(payload: IDataCreateSubscription): Promise<SubscriptionPlan>;
  update(payload: Partial<SubscriptionPlan>): Promise<UpdateResult>;
  updateByStripe(stripeSubscriptionId: string, payload: Partial<SubscriptionPlan>): Promise<UpdateResult>;
}
