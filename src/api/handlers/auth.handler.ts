import jwt from "jsonwebtoken";
import mailer from "../../services/mailer";
import { UpdateResult } from "typeorm";
import userRepository from "../../database/postgres/repositories/user.repository";
import IAuthHandler from "./interface/authHandler.interface";

class AuthHandler implements IAuthHandler {
  generateAuthToken(sub: string): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
    return { accessToken, refreshToken };
  }
  generateOtp(): string {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }
  async verifyOtp(otp: string, email: string): Promise<UpdateResult> {
    try {
      const user = await userRepository.getByEmail(email);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }

      if (user.otp !== otp) {
        throw new Error("Opt is wrong!");
      }

      const result = await userRepository.update({ id: user.id, emailVerified: true });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async resendOtp(email: string): Promise<UpdateResult> {
    try {
      const user = await userRepository.getByEmail(email);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }

      const newOtp = this.generateOtp();
      await mailer.sendMail({
        message: `New OTP for your account: <strong>${newOtp}</strong>`,
        subject: "TrySomeThignBlog - Resend OTP",
        to: email,
        text: "RESEND OTP",
      });
      const result = await userRepository.update({ id: user.id, otp: newOtp });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthHandler();
