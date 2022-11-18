import { Step } from "./Step";
import { Ingredient } from "./Ingredient";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  shortDescription: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.recipe)
  steps: Step[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
