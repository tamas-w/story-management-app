import express from "express";
import consola, { Consola } from "consola";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data_source";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";

export class Server {
  public app: express.Application;
  public logger: Consola = consola;

  public constructor() {
    this.app = express();
  }
  public start() {
    this.setConfig();
    this.setRequestLogger();
    this.setRoutes();

    this.app.listen(process.env.PORT, () => {
      this.logger.success(`Server is listening on port: ${process.env.PORT}`);
    });
  }
  private setConfig() {
    this.dbConnection();
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api", userRoutes);
    this.app.use("/api", taskRoutes);

    dotenv.config();
  }
  private setRequestLogger() {
    this.app.use(async (req, res, next) => {
      console.log(`[${req.method} - ${req.path}]`);

      next();
    });
  }
  private setRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ success: true, message: "Get method works" });
    });
  }
  private dbConnection() {
    try {
      AppDataSource.initialize();
      this.logger.success("Database connected");
    } catch (error) {
      console.error(error);
    }
  }
}
