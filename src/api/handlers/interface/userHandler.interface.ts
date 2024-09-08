import { IFileUpload } from "../../shared";
import { User } from "../../../database/postgres/entities/user.entity";
import { UpdateResult } from "typeorm";
import { EAuthProvider } from "../../../database/postgres/interface";
import { IParamsGetDetailUser } from "../../../database/postgres/respositories/interface";

export interface IParamsSignUp {
  image: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  otp: string;
}

export interface IParamsCreateAccountSocial {
  authProviderId: string;
  authProvider: EAuthProvider;
  name: string;
  email: string;
  avatar: string;
  location: string;
}

export interface IParamsGetPreSignUrl {
  userId: string;
  file: IFileUpload;
}

export interface IUserHandler {
  create(params: IParamsSignUp): Promise<User>;
  createAccountSocial(params: IParamsCreateAccountSocial): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getPasswordUser(id: string): Promise<User>;
  getByUserName(userName: string): Promise<User>;
  getPreSignUrlProfileImage(params: IParamsGetPreSignUrl): Promise<string>;
  update(params: Partial<User>): Promise<UpdateResult>;
  getDetail(params: IParamsGetDetailUser): Promise<User>;
}
