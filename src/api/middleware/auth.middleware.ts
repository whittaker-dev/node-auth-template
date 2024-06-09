import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userHandler from "../handlers/user.handler";
import { IUserAuthInfoRequest } from "../types/interface";
import { errorResponse } from "../routers/response";
import logger from "../logger";

class AuthMiddleware {
  async authToken(req: IUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) return errorResponse(res, new Error("Unauthorized"));

      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) return errorResponse(res, new Error("Unauthorized"));

      const result = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;

      if (Date.now() >= result.exp * 1000) {
        return errorResponse(res, new Error("Token expired"), 401);
      }

      const { sub } = jwt.decode(token) as JwtPayload;
      const user = await userHandler.getDetail({ id: sub });

      req.user = user;

      next();
    } catch (error) {
      logger.error(error);
      return errorResponse(res, new Error("Forbidden"));
    }
  }
}

export default new AuthMiddleware();
