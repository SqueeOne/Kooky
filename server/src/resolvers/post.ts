import { Category } from "./../entities/Category";
import { MyContext } from "./../types";
import { isAuth } from "./../middleware/isAuth";
import { Profile } from "./../entities/Profile";
import { Post } from "./../entities/Post";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import AppDataSource from "../DataSource";
import { In } from "typeorm";

@InputType()
class PostInput {
  @Field()
  title!: string;

  @Field()
  bodyText: string;
}

@Resolver(Post)
export class PostResolver {
  // Query for getting all the posts
  // from categories the user is
  // subscribed to
  @Query(() => [Post])
  async profilePosts(@Arg("profileId") profileId: number): Promise<Post[]> {
    const currentProfile = await AppDataSource.manager.findOne(Profile, {
      where: { id: profileId },
    });

    const profileCategories = currentProfile?.categories;

    const profilePosts = await AppDataSource.manager.find(Post, {
      relations: { categories: true, profile: true },
      where: { profile: { id: profileId } },
    });

    let CategoryIds: number[] = [];

    profileCategories?.map((cat) => {
      CategoryIds.push(cat.id);
    });
    const categoryPosts = await AppDataSource.manager.find(Post, {
      relations: { categories: true },
      where: { categories: { id: In(CategoryIds) } },
    });

    profilePosts.concat(categoryPosts);

    return profilePosts;
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await AppDataSource.manager.find(Post);

    return posts;
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Arg("categoryIds", () => [Int]) categoryIds: number[],
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const profile = await AppDataSource.manager.findOne(Profile, {
      relations: { user: true },
      where: { user: { id: req.session.userId } },
    });

    const categories = await AppDataSource.manager.find(Category, {
      where: { id: In(categoryIds) },
    });
    const post = AppDataSource.manager
      .create(Post, {
        ...input,
        profile: { ...profile },
        categories: { ...categories },
      })
      .save();

    return post;
  }
}
