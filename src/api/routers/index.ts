import { Router } from "express";
import { IRouter } from "./interface";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import subscriptionRouter from "./subscription.router";

const router = Router();

class BaseRouter implements IRouter {
  get routes() {
    router.use("/users", userRouter.routes);
    router.use("/auth", authRouter.routes);
    router.use("/subscriptions", subscriptionRouter.routes);
    return router;
  }
}

export default new BaseRouter();
