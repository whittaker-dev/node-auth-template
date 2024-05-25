import { Router } from "express";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";
import userHandler from "../handlers/user.handler";
import routerHelper, { schema } from "../helper/router.helper";
import logger from "../logger";

const router = Router();

class UserRouter implements IRouter {
  get routes() {
    router.post(
      "/profile-image/pre-sign-url",
      routerHelper.validateBody(schema.preSignUrlProfileImage),
      async (req, res) => {
        try {
          const preSignUrl = await userHandler.getPreSignUrlProfileImage({ ...req.body });
          logger.log("info", preSignUrl);
          return successResponse(res, preSignUrl);
        } catch (error) {
          return errorResponse(res, error);
        }
      },
    );
    router.put("/:id");
    return router;
  }
}

export default new UserRouter();
