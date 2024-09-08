import nodemailer from "nodemailer";
import IMailer, { IDataSendMail } from "./interface";
import logger from "../../api/logger";

class Mailer implements IMailer {
  async sendMail({ message, subject, to, text = "" }: IDataSendMail) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.USER_MAIL,
        to,
        subject,
        text,
        html: `<div>
        <p>${message}</p>
        </div>`,
      });

      return info.response;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }
}
export default new Mailer();
