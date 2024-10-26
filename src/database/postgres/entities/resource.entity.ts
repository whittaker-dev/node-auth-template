import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { BoardResource } from "./board.entity";
import { User } from "./user.entity";
import { ResourceTag } from "./resourceTag.entity";

@Entity()
export class Resource extends BaseEntity {
  @Column({ name: "title" })
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column({ default: null })
  file: string;

  @Column({ name: "is_publish", default: false })
  isPublish: boolean;

  @ManyToOne(() => User, (user) => user.resources, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  author: User;

  @ManyToOne(() => BoardResource, (board) => board.resources, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "resource_id" })
  board: BoardResource;

  @ManyToMany(() => ResourceTag, (tag) => tag.resources, { cascade: true })
  @JoinTable({
    name: "resources_tags",
    joinColumn: { name: "tag_id" },
    inverseJoinColumn: { name: "resource_id" },
  })
  tags: ResourceTag[];
}
