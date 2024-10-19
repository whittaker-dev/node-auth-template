import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { errorResponse } from "../routers/response";
import { regexPassword } from "../utils";
import { ETypeSubscription } from "../../database/postgres/interface/subscription.interface";

const schemaFileUpload = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  extension: Joi.string().required().valid("png", "jpg", "jpeg", "gif"),
});

export const schema = {
  paramsId: Joi.object({
    id: Joi.string().required().error(new Error(`Id is required`)),
  }),
  signUp: Joi.object({
    avatar: Joi.string().allow(null, ""),
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
  authenticateSocial: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    location: Joi.string(),
    avatar: Joi.string().required(),
    email: Joi.string(),
  }),

  verifyOtp: Joi.object({
    otp: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
  resendOtp: Joi.object({
    email: Joi.string().email().required(),
  }),

  preSignUrlProfileImage: Joi.object({
    userId: Joi.string().required(),
    file: schemaFileUpload,
  }),
  updateUser: Joi.object({
    avatar: Joi.string(),
    name: Joi.string(),
    userName: Joi.string(),
    email: Joi.string().email(),
    websiteUrl: Joi.string(),
    bio: Joi.string(),
    location: Joi.string(),
    emailVerified: Joi.boolean(),
    displayName: Joi.string(),
  }),

  subscribePlan: Joi.object({
    priceId: Joi.string().required().messages({
      "any.required": "Plan is required, Please select a subscription plan",
    }),
    type: Joi.string()
      .required()
      .valid(ETypeSubscription.FreeTrial, ETypeSubscription.Advanced, ETypeSubscription.Unlimited)
      .messages({
        "any.required": "Type plan is required",
      }),
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
