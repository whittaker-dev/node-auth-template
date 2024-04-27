import { Router } from "express";
import { IRouter } from "./interface";
import { errorResponse } from "./response";

const router = Router();

class UserRouter implements IRouter {
  get routes() {
    router.post("/", async (req, res) => {
      try {
        console.log("Body", req.body);
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new UserRouter();
