import { Request } from "express";
import { User } from "../../database/postgres/entities/user.entity";

export interface IUserAuthInfoRequest extends Request {
  user: User;
}
