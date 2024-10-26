import { ICreateResource } from "../../../../api/handlers/interface";
import { Resource } from "../../entities/resource.entity";

export interface IResourceRepository {
  create(data: ICreateResource): Promise<Resource>;
}
