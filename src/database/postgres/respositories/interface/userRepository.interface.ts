import { UpdateResult } from "typeorm";
import { User } from "../../entities/user.entity";

export interface IUserRepository {
  create(params: Partial<User>): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getPasswordUser(id: string): Promise<User>;
  getByUserName(userName: string): Promise<User>;
  getById(id: string): Promise<User>;
  update(params: Partial<User>): Promise<UpdateResult>;
}
