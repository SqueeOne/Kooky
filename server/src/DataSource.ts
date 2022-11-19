import { Recipe } from "./entities/Recipe";
import { Step } from "./entities/Step";
import { Ingredient } from "./entities/Ingredient";
import { Post } from "./entities/Post";
import { Category } from "./entities/Category";
import { Profile } from "./entities/Profile";
import { User } from "./entities/User";
import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  logging: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [User, Profile, Category, Post, Ingredient, Step, Recipe],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    AppDataSource.runMigrations();
  })
  .catch((err) => {
    console.error(err);
  });

export default AppDataSource;
