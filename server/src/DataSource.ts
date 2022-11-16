import { User } from "./entities/User";
import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL as string,
  logging: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [User],
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
