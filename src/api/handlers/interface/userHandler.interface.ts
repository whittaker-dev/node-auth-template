import { IFileUpload } from "../../shared";
import { User } from "../../../database/postgres/entities/user.entity";

export interface IParamsSignUp {
  image: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IParamsGetPreSignUrl {
  userId: string;
  file: IFileUpload;
}

export interface IAuthHandler {
  create(params: IParamsSignUp): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getPasswordUser(id: string): Promise<User>;
  getByUserName(userName: string): Promise<User>;
  getPreSignUrlProfileImage(params: IParamsGetPreSignUrl): Promise<string>;
}
