import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { PostgresDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IParamsGetDetailUser, IUserRepository } from "./interface";

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

  getDetail(params: IParamsGetDetailUser): Promise<User> {
    try {
      const { authProvideId, id } = params;

      const whereOptions: FindOptionsWhere<User> | FindOptionsWhere<User> = {};
      if (authProvideId) {
        whereOptions["authProviderId"] = authProvideId;
      }

      if (id) {
        whereOptions["id"] = id;
      }

      return this.repo.findOne({ where: { ...whereOptions } });
    } catch (error) {
      throw error;
    }
  }
}
export default new UserRepository();
