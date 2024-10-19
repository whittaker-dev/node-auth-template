import { Repository, UpdateResult } from "typeorm";
import { SubscriptionPlan } from "../entities/subscriptionPlan.entity";
import { IDataCreateSubscription, ISubscriptionRepository } from "./interface";
import { PostgresDataSource } from "../data-source";

class SubscriptionRepository implements ISubscriptionRepository {
  repository: Repository<SubscriptionPlan>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(SubscriptionPlan);
  }
  create(payload: IDataCreateSubscription): Promise<SubscriptionPlan> {
    return this.repository.save({ ...payload });
  }
  update(payload: Partial<SubscriptionPlan>): Promise<UpdateResult> {
    const { id } = payload;
    return this.repository.update(id, payload);
  }
  async updateByStripe(stripeSubscriptionId: string, payload: Partial<SubscriptionPlan>): Promise<UpdateResult> {
    const subscription = await this.repository.findOne({ where: { stripeSubscriptionId } });
    return this.repository.update(subscription.id, payload);
  }
}

export default new SubscriptionRepository();
