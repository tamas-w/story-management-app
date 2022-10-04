import { DataSource } from "typeorm";
import { User } from "./src/entity/user.entity";
import { Task } from "./src/entity/task.entity";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [User, Task],
});
