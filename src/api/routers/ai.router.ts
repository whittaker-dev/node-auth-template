import { Router } from "express";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";
import { AiGeneration } from "../../database/mongo/schemas";

const router = Router();

class AIRouter implements IRouter {
  get routes() {
    router.post("/generate", async (req, res) => {
      try {
        const newAI = await AiGeneration.create({ title: "new ai generate content" });
        console.log({ newAI });
        return successResponse(res, newAI);
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new AIRouter();
