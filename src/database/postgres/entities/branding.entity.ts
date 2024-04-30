import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Branding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "color", default: null })
  color: string;

  @OneToOne(() => User, (user) => user.branding, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  userId: User;
}
