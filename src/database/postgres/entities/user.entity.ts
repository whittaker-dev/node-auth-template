import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "name", default: null })
  name: string;

  @Column({ name: "display_name", default: null })
  displayName: string;

  @Column({ name: "avatar", default: null })
  avatar: string;
}
