import { User } from "../../database/postgres/entities/user.entity";
import { IUserHandler, IParamsGetPreSignUrl, IParamsSignUp, IParamsCreateAccountSocial } from "./interface";
import userRepository from "../../database/postgres/respositories/user.repository";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
import { UpdateResult } from "typeorm";
import { IParamsGetDetailUser } from "src/database/postgres/respositories/interface";

class UserHandler implements IUserHandler {
  s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      region: process.env.AWS_REGION,
      signatureVersion: "v4",
    });
  }
  async create(params: IParamsSignUp): Promise<User> {
    try {
      const { password } = params;
      const passwordHashed = await bcrypt.hash(password, 10);
      const newUser = await userRepository.create({ ...params, password: passwordHashed });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async createAccountSocial(params: IParamsCreateAccountSocial): Promise<User> {
    try {
      const newUser = await userRepository.create({ ...params });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const user = await userRepository.getByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPasswordUser(id: string): Promise<User> {
    try {
      const user = await userRepository.getPasswordUser(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getByUserName(userName: string): Promise<User> {
    try {
      const user = await userRepository.getByUserName(userName);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getPreSignUrlProfileImage(params: IParamsGetPreSignUrl): Promise<string> {
    try {
      const { file, userId } = params;
      const user = await userRepository.getById(userId);
      if (!user) {
        throw new Error(`User doesn't exist`);
      }
      const Key = `users/${userId}/${file.name}.${file.extension}`;
      const options = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key,
        ContentType: file.type,
      };

      const preSignUrl = this.s3.getSignedUrl("putObject", options);

      return preSignUrl;
    } catch (error) {
      throw error;
    }
  }

  async update(params: Partial<User>): Promise<UpdateResult> {
    try {
      const { id, avatar } = params;
      const user = await userRepository.getById(id);
      if (!user) {
        throw new Error(`User with id ${id} doesn't exist`);
      }

      if (avatar) {
        const result = await userRepository.update({
          id,
          avatar,
        });
        return result;
      }

      return await userRepository.update({
        avatar: user.avatar,
        ...params,
      });
    } catch (error) {
      throw error;
    }
  }

  async getDetail(params: IParamsGetDetailUser): Promise<User> {
    try {
      const user = await userRepository.getDetail({ ...params });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserHandler();
