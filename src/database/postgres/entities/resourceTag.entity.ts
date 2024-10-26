import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Resource } from "./resource.entity";

@Entity()
export class ResourceTag extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Resource, (resource) => resource.tags)
  resources: Resource[];
}
