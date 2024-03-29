import { Response } from "express";
import httpStatus from "http-status";

export const successResponse = (res: Response, data: any) => {
  return res.status(httpStatus.OK).json({
    status: "success",
    data,
  });
};

export const errorResponse = (
  res: Response,
  error: Error,
  code = httpStatus.BAD_REQUEST
) => {
  return res.status(code).json({
    status: "error",
    message: error.message,
  });
};
