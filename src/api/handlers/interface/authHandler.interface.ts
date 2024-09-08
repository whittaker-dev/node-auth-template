import { UpdateResult } from "typeorm";

export default interface IAuthHandler {
  generateAuthToken(sub: string): { accessToken: string; refreshToken: string };
  verifyOtp(otp: string, email: string): Promise<UpdateResult>;
  generateOtp(): string;
  resendOtp(email: string): Promise<UpdateResult>;
}
