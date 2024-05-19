import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { IUserRepository } from "./interface";
import { PostgresDataSource } from "../data-source";

class UserRepository implements IUserRepository {
  repo: Repository<User>;
  constructor() {
    this.repo = PostgresDataSource.getRepository(User);
  }
  create(params: Partial<User>): Promise<User> {
    return this.repo.save({ ...params });
  }
  getByEmail(email: string): Promise<User> {
    return this.repo.findOne({ where: { email } });
  }
  getPasswordUser(id: string): Promise<User> {
    return this.repo.findOne({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });
  }

  getByUserName(userName: string): Promise<User> {
    return this.repo.findOne({ where: { userName } });
  }
}
export default new UserRepository();
