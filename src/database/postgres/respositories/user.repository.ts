import { Repository, UpdateResult } from "typeorm";
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

  getById(id: string): Promise<User> {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  update(params: Partial<User>): Promise<UpdateResult> {
    const { id } = params;
    return this.repo.update(id, params);
  }
}
export default new UserRepository();
