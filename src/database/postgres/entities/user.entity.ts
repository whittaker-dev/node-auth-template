import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branding } from "./branding.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ name: "name", default: null })
  name: string;

  @Column({ name: "display_name", default: null })
  displayName: string;

  @Column({ name: "user_name", unique: true })
  userName: string;

  @Column({ name: "avatar", default: null })
  avatar: string;

  @Column({ name: "website_url", default: null })
  websiteUrl: string;

  @Column({ name: "bio", default: null })
  bio: string;

  @Column({ name: "location", default: null })
  location: string;

  @OneToOne(() => Branding, (branding) => branding.userId) // specify inverse side as a second parameter
  branding: Branding;
}
