import express, { Application, Request, Response } from "express";
import cors from "cors";
import BaseRouter from "./routers";

interface IApi {
  startServer(): Promise<Application>;
}

class Api implements IApi {
  async startServer(): Promise<Application> {
    const app = express();
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", BaseRouter.routes);

    app.get("/", (req: Request, res: Response) => {
      return res.send("Welcome to TrySomeThign-Blog application");
    });
    return app;
  }
}

export default new Api();
