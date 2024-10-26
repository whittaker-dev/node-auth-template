import { ICreateResource } from "src/api/handlers/interface";
import { Resource } from "../entities/resource.entity";
import { IResourceRepository } from "./interface";
import { Repository } from "typeorm";
import { PostgresDataSource } from "../data-source";

class ResourceRepository implements IResourceRepository {
  repo: Repository<Resource>;
  constructor() {
    this.repo = PostgresDataSource.getRepository(Resource);
  }
  async create(data: ICreateResource): Promise<Resource> {
    const newResource = await this.repo.save({
      ...data,
    });

    return newResource
  }
}
export default new ResourceRepository()