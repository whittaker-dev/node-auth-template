import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: "TrySomeThign Blog" }),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.printf((info) => {
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }),
  ),
  // transports: [
  //   new winston.transports.Console(),
  //   new winston.transports.File({
  //     level: "info",
  //     format: winston.format.printf((info) => {
  //       return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
  //     }),
  //     filename: "logger.ts",
  //     maxsize: 1,
  //   }),
  //   new winston.transports.Http({ host: "localhost", port: 8080 }),
  // ],
});
logger.info("winston transports");
export default logger;
