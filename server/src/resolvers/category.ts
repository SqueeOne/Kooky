import { MyContext } from "./../types";
import { Profile } from "./../entities/Profile";
import { isAuth } from "./../middleware/isAuth";
import AppDataSource from "../DataSource";

import { Category } from "./../entities/Category";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

@Resolver(Category)
export class CategoryResolver {
  // List all categories
  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    const categories = await AppDataSource.getRepository(Category).find();
    return categories;
  }

  @Query(() => [Category])
  async userCategories(@Ctx() { req }: MyContext) {
    const profile = await AppDataSource.manager.findOne(Profile, {
      relations: { user: true },
      where: { user: { id: req.session.userId } },
    });

    console.log(profile?.id);

    const categories = profile?.categories;

    console.log(categories);

    return categories;
  }

  @Mutation(() => Category)
  @UseMiddleware(isAuth)
  async createCategory(@Arg("name") name: string): Promise<Category> {
    const category = AppDataSource.manager
      .create(Category, { name: name })
      .save();

    return category;
  }
}
