import { Category } from "./Category";
import { Post } from "./Post";
import { User } from "./User";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  profileName: string;

  @OneToMany(() => Post, (post) => post.profile)
  posts: Post[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Category, (category) => category.profiles)
  @JoinTable()
  categories: Category[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
