import { Replay } from "./entity/Replay";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comment } from "./entity/Comment";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Comment, Replay],
  migrations: [],
  subscribers: [],
});
