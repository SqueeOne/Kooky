import { MyContext } from "./../types";
import { Profile } from "./../entities/Profile";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import AppDataSource from "../DataSource";

@Resolver(Profile)
export class ProfileResolver {
  // Query to return profile of logged in user,
  // or take the user to the create profile page
  // if the profile doesn't exist yet
  @Query(() => Profile, { nullable: true })
  async myProfile(@Ctx() { req }: MyContext): Promise<Profile | null> {
    try {
      return AppDataSource.manager.findOne(Profile, {
        relations: { user: true },
        where: { user: { id: req.session.userId } },
      });
    } catch {
      return null;
    }
  }

  @Mutation(() => Profile)
  async createProfile(@Arg("name") name: string, @Ctx() { req }: MyContext);
}
