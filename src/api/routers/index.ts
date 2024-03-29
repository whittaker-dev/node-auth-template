import { Router } from "express";
import { IRouter } from "./interface";

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    // router.use("/users");
    return router;
  }
}

export default new BaseRouter();
