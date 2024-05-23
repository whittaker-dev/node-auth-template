import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branding } from "./branding.entity";
import { ERoleUser } from "../interface";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ name: "name", default: null })
  name: string;

  @Column({})
  email: string;

  @Column({ default: null, select: false })
  password: string;

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

  @Column({ name: "email_verified", default: false })
  emailVerified: boolean;

  @Column({ type: "enum", enum: ERoleUser, default: ERoleUser.Dev })
  role: ERoleUser;
}
