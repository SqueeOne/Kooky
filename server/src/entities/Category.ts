import { Post } from "./Post";
import { Profile } from "./Profile";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Profile])
  @ManyToMany(() => Profile, (profile) => profile.categories, {
    nullable: true,
  })
  profiles: Profile[];

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.categories, {
    nullable: true,
  })
  posts: Post[];
}
