import bcrypt from "bcrypt";
import { Router } from "express";
import { EAuthProvider } from "../../database/postgres/interface";
import mailer from "../../services/mailer";
import authHandler from "../handlers/auth.handler";
import userHandler from "../handlers/user.handler";
import routerHelper, { schema } from "../helper/router.helper";
import logger from "../logger";
import authMiddleware from "../middleware/auth.middleware";
import { IUserAuthInfoRequest } from "../types/interface";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";
const router = Router();

class AuthRouter implements IRouter {
  get routes() {
    router.post("/sign-up", routerHelper.validateBody(schema.signUp), async (req, res) => {
      try {
        const { email, userName } = req.body;
        const userExist = await userHandler.getByEmail(email);
        if (userExist) {
          throw new Error(`Email does exist`);
        }

        const userNameExist = await userHandler.getByUserName(userName);
        if (userNameExist) {
          throw new Error(`User name does exist`);
        }

        const otp = authHandler.generateOtp();
        await mailer.sendMail({
          message: `OTP for your account: <strong>${otp}</strong>`,
          subject: "TrySomeThignBlog - New Account",
          to: email,
          text: "SIGN UP NEW ACCOUNT",
        });
        const newUser = await userHandler.create({
          ...req.body,
          otp,
        });

        delete newUser.password;
        return successResponse(res, { user: newUser });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });
    router.post("/sign-in", routerHelper.validateBody(schema.signIn), async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await userHandler.getByEmail(email);
        if (!user) {
          throw new Error(`Account with this email doesn't exist`);
        }
        const userWithPassword = await userHandler.getPasswordUser(user.id);
        const isValidPassword = await bcrypt.compare(password, userWithPassword.password);
        if (!isValidPassword) {
          throw new Error(`Password incorrect`);
        }

        if (!user.emailVerified) {
          throw new Error(`Account doesn't verified`);
        }
        const { accessToken, refreshToken } = authHandler.generateAuthToken(user.id);
        return successResponse(res, { user: { ...user, accessToken, refreshToken } });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });

    router.post("/social/:provider", routerHelper.validateBody(schema.authenticateSocial), async (req, res) => {
      try {
        const { provider } = req.params;
        const { id, name, email, location, avatar } = req.body;
        const userExist = await userHandler.getDetail({ authProvideId: id });
        if (userExist) {
          const { accessToken, refreshToken } = authHandler.generateAuthToken(userExist.id);
          return successResponse(res, { user: { ...userExist, accessToken, refreshToken } });
        }

        const newUser = await userHandler.createAccountSocial({
          email,
          avatar,
          name,
          location: location ?? "",
          authProviderId: id,
          authProvider: provider as EAuthProvider,
        });
        const { accessToken, refreshToken } = authHandler.generateAuthToken(newUser.id);

        return successResponse(res, { user: { ...newUser, accessToken, refreshToken } });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });

    router.get("/get-user", authMiddleware.authToken, async (req: IUserAuthInfoRequest, res) => {
      try {
        const { user } = req;
        return successResponse(res, { user });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });

    router.get("/refresh-token", authMiddleware.authToken, async (req: IUserAuthInfoRequest, res) => {
      try {
        const { accessToken } = authHandler.generateAuthToken(req.user.id);

        return successResponse(res, { accessToken });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });

    router.post("/verify-otp", routerHelper.validateBody(schema.verifyOtp), async (req, res) => {
      try {
        const { otp, email } = req.body;
        await authHandler.verifyOtp(otp, email);
        return successResponse(res, { message: "Your OTP has been verified successfully" });
      } catch (error) {
        return errorResponse(res, error);
      }
    });

    router.post("/resend-otp", routerHelper.validateBody(schema.resendOtp), async (req, res) => {
      try {
        const { email } = req.body;
        await authHandler.resendOtp(email);
        return successResponse(res, { message: `Otp has been resend successfully` });
      } catch (error) {
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new AuthRouter();
