/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";

// Error handling middleware
export const errorHandling = (error, req, res, next) => {
  console.log("This is Error handling");

  // Kiểm tra xem có status code error không nếu không gán là code : 500
  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
  const statuscode = error.statusCode;
  const resError = {
    statuscode : statuscode,
    Message : error.message || "Internal Server Error",
    stack : error.stack
  }

  console.log("BUILD_MODE : ", env.BUILD_MODE);
  // Môi trường dev mới consoleLog stack trace:
  if (env.BUILD_MODE !== 'dev') {
    delete resError.stack
  }
  res.status(statuscode).json(resError)
}