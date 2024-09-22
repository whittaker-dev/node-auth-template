import { Router } from "express";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";
import logger from "../logger";
import authMiddleware from "../middleware/auth.middleware";
import routerHelper, { schema } from "../helper/router.helper";
import subscriptionHandler from "../handlers/subscription.handler";
import { IUserAuthInfoRequest } from "../types/interface";

const router = Router();
class SubscriptionRouter implements IRouter {
  get routes() {
    router.post(
      "/subscribe",
      authMiddleware.authToken,
      routerHelper.validateBody(schema.subscribePlan),
      async (req: IUserAuthInfoRequest, res) => {
        try {
          const { priceId, type } = req.body;
          console.log(">>>>> User", req.user);
          const checkoutSessionUrl = await subscriptionHandler.subscribePlan(req.user.id, priceId, type);
          return successResponse(res, { url: checkoutSessionUrl });
        } catch (error) {
          logger.error(error);
          return errorResponse(res, error);
        }
      },
    );
    return router;
  }
}

export default new SubscriptionRouter();
