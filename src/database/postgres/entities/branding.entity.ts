import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Branding extends BaseEntity {
  @Column({ name: "color", default: null })
  color: string;

  @OneToOne(() => User, (user) => user.branding, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  userId: User;
}
