import { Router } from "express";
import resourceHandler from "../handlers/resource.handler";
import routerHelper, { schema } from "../helper/router.helper";
import authMiddleware from "../middleware/auth.middleware";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";

const router = Router();

class ResourceRouter implements IRouter {
  get routes() {
    router.post(
      "/",
      authMiddleware.authToken,
      routerHelper.validateBody(schema.createResource),
      async (req, res) => {
        try {
          const resource = await resourceHandler.create(req.body);
          return successResponse(res, resource);
        } catch (error) {
          return errorResponse(res, error);
        }
      },
    );
    return router;
  }
}

export default new ResourceRouter();
