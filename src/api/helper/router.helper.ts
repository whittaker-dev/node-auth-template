import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { errorResponse } from "../routers/response";
import { regexPassword } from "../utils";

const schemaFileUpload = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  extension: Joi.string().required().valid("png", "jpg", "jpeg", "gif"),
});

export const schema = {
  signUp: Joi.object({
    avatar: Joi.string().required(),
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().regex(regexPassword),
    passwordConfirm: Joi.string().valid(Joi.ref("password")).required().error(new Error("Password must match")),
  }),
  signIn: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),

  preSignUrlProfileImage: Joi.object({
    userId: Joi.string().required(),
    file: schemaFileUpload,
  }),
};

class RouterHelper {
  validateBody(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return errorResponse(res, result.error);
      }
      next();
    };
  }

  validateQuery(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.query);
      if (result.error) {
        return errorResponse(res, result.error);
      }
      next();
    };
  }

  validateParams(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.params);
      if (result.error) {
        return errorResponse(res, result.error);
      }
      next();
    };
  }
}
export default new RouterHelper();
