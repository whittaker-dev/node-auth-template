import { Router } from "express";
import { IRouter } from "./interface";
import { errorResponse, successResponse } from "./response";
import userHandler from "../handlers/user.handler";
import routerHelper, { schema } from "../helper/router.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../logger";
import { EAuthProvider } from "../../database/postgres/interface";
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

        const newUser = await userHandler.create(req.body);
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
        const newToken = jwt.sign(user.id, process.env.JWT_SECRET_KEY);
        return successResponse(res, { user: { ...user, accessToken: newToken } });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });

    router.post("/social/:provider", routerHelper.validateBody(schema.authenticateSocial), async (req, res) => {
      try {
        const { provider } = req.params;
        const { id, name, email, location, avatar } = req.body;
        const newUser = await userHandler.createAccountSocial({
          email,
          avatar,
          name,
          location: location ?? "",
          authProviderId: id,
          authProvider: provider as EAuthProvider,
        });
        return successResponse(res, { newUser });
      } catch (error) {
        logger.error(error);
        return errorResponse(res, error);
      }
    });
    return router;
  }
}

export default new AuthRouter();
