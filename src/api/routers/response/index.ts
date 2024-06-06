import { Response } from "express";
import httpStatus from "http-status";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const successResponse = (res: Response, data: any) => {
  return res.status(httpStatus.OK).json({
    status: "success",
    data,
  });
};

export const errorResponse = (res: Response, error: Error, code?: number) => {
  return res.status(code ?? httpStatus.BAD_REQUEST).json({
    status: "error",
    message: error.message,
  });
};
