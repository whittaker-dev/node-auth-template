import IAuthHandler from "./interface/authHandler.interface";
import jwt from "jsonwebtoken";

class AuthHandler implements IAuthHandler {
  generateAuthToken(sub: string): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
    return { accessToken, refreshToken };
  }
}

export default new AuthHandler();
