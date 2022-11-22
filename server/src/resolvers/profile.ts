import { isAuth } from "./../middleware/isAuth";
import { User } from "./../entities/User";
import { MyContext } from "./../types";
import { Profile } from "./../entities/Profile";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import AppDataSource from "../DataSource";

@Resolver(Profile)
export class ProfileResolver {
  // Query to return profile of logged in user,
  // or take the user to the create profile page
  // if the profile doesn't exist yet
  @Query(() => Profile, { nullable: true })
  async myProfile(@Ctx() { req }: MyContext): Promise<Profile | null> {
    const profile = await AppDataSource.getRepository(Profile)
      .createQueryBuilder("profile")
      .leftJoinAndSelect("profile.user", "user")
      .where("profile.user = :id", { id: req.session.userId })
      .getOne();

    return profile;
  }

  @Query(() => [Profile])
  async profiles(): Promise<Profile[]> {
    const profiles = await AppDataSource.getRepository(Profile).find();

    return profiles;
  }

  @Mutation(() => Profile)
  @UseMiddleware(isAuth)
  async createProfile(
    @Arg("name") name: string,
    @Arg("about") about: string,
    @Ctx() { req }: MyContext
  ): Promise<Profile> {
    const currentUser = await AppDataSource.manager.findOne(User, {
      where: { id: req.session.userId },
    });
    const profile = AppDataSource.manager
      .create(Profile, {
        profileName: name,
        about: about,
        user: { ...currentUser },
      })
      .save();

    return profile;
  }
}
