import { Resource } from "../../database/postgres/entities/resource.entity";
import IResourceHandler, { ICreateResource } from "./interface/resourceHandler.interface";
import resourceRepository from "../../database/postgres/repositories/resource.repository";

class ResourceHandler implements IResourceHandler {
  async create(data: ICreateResource): Promise<Partial<Resource>> {
    const resource = await resourceRepository.create(data);
    return resource;
  }
}

export default new ResourceHandler();
