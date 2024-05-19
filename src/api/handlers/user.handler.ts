import { User } from "../../database/postgres/entities/user.entity";
import { IAuthHandler, IParamsSignUp } from "./interface";
import userRepository from "../../database/postgres/respositories/user.repository";
import bcrypt from "bcrypt";

class AuthHandler implements IAuthHandler {
  async create(params: IParamsSignUp): Promise<User> {
    try {
      const { password } = params;
      const passwordHashed = await bcrypt.hash(password, 10);
      const newUser = await userRepository.create({ ...params, password: passwordHashed });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await userRepository.getByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPasswordUser(id: string): Promise<User> {
    try {
      const user = await userRepository.getPasswordUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getByUserName(userName: string): Promise<User> {
    try {
      const user = await userRepository.getByUserName(userName);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthHandler();
