import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Resource } from "./resource.entity";

@Entity()
export class BoardResource extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Resource, (resource) => resource.board)
  resources: Resource[];
}
