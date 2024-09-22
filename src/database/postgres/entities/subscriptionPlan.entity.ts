import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ETypeSubscription } from "../interface/subscription.interface";
import { User } from "./user.entity";

@Entity()
export class SubscriptionPlan extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: ETypeSubscription.FreeTrial, enum: ETypeSubscription })
  type: ETypeSubscription;

  @Column({ name: "stripe_subscription_id", default: null })
  stripeSubscriptionId: string;

  @ManyToOne(() => User, (user) => user.subscriptions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;

  @Column({ name: "is_default", default: true })
  isDefault: boolean;
}
