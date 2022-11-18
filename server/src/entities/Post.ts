import { Profile } from "./Profile";
import { Category } from "./Category";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  bodyText: string;

  @Field()
  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Profile, (profile) => profile.posts)
  profile: Profile;
}
