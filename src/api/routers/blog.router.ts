import { Router } from "express";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";

const router = Router();

class BlogRouter implements IRouter {
  get routes() {
    router.post("/", async (req, res) => {
      try {
        return successResponse(res, {});
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new BlogRouter();
