import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Branding } from "./branding.entity";
import { EAuthProvider, ERoleUser } from "../interface";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ name: "name", default: null })
  name: string;

  @Column({ default: null, unique: true })
  email: string;

  @Column({ default: null, select: false })
  password: string;

  @Column({ name: "display_name", default: null })
  displayName: string;

  @Column({ name: "user_name", unique: true, default: null })
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

  @Column({
    type: "enum",
    enum: EAuthProvider,
    name: "auth_provider",
    default: EAuthProvider.EmailPassword,
  })
  authProvider: EAuthProvider;

  @Column({ name: "auth_provider_id", default: null })
  authProviderId: string;

  @Column({ name: "otp", default: null })
  otp: string;
}
