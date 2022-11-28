import { isAuth } from "./../middleware/isAuth";
import { Profile } from "./../entities/Profile";
import AppDataSource from "../DataSource";

import { Category } from "./../entities/Category";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver(Category)
export class CategoryResolver {
  // List all categories
  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    const categories = await AppDataSource.getRepository(Category).find();
    return categories;
  }

  @Query(() => [Category])
  async userCategories(
    @Arg("profileId") profileId: number
  ): Promise<Category[] | null> {
    const currentProfile = await AppDataSource.manager.findOne(Profile, {
      where: { id: profileId },
    });

    if (currentProfile) {
      return currentProfile?.categories;
    }
    return null;
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
