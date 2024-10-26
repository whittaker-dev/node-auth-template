import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ESubscriptionStatus, ETypeSubscription } from "../interface/subscription.interface";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity()
export class SubscriptionPlan extends BaseEntity {
  @Column({ default: ETypeSubscription.FreeTrial, enum: ETypeSubscription })
  type: ETypeSubscription;

  @Column({ name: "stripe_subscription_id", default: null })
  stripeSubscriptionId: string;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Column({ name: "is_default", default: true })
  isDefault: boolean;

  @Column({ name: "status", enum: ESubscriptionStatus, default: ESubscriptionStatus.Pending })
  status: ESubscriptionStatus;

  @Column({ name: "expired_at", default: null })
  expiredAt: Date;
}
