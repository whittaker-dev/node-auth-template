import { Resource } from "../../../database/postgres/entities/resource.entity";

export interface ICreateResource {
  title: string;
  description: string;
  link?: string;
  boardId?: string;
  tagIds?: string[];
}

export default interface IResourceHandler {
  create(data: ICreateResource): Promise<Partial<Resource>>;
}
