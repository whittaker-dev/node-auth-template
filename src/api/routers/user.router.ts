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
          return successResponse(res, preSignUrl);
        } catch (error) {
          logger.error(error);
          return errorResponse(res, error);
        }
      },
    );
    router.put(
      "/:id",
      routerHelper.validateParams(schema.paramsId),
      routerHelper.validateBody(schema.updateUser),
      async (req, res) => {
        try {
          const { id } = req.params;
          await userHandler.update({ ...req.body, id });

          return successResponse(res, { message: `The user has been updated successfully` });
        } catch (error) {
          logger.error(error);
          return errorResponse(res, error);
        }
      },
    );
    return router;
  }
}

export default new UserRouter();
