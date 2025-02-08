/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";

// Error handling middleware
export const errorHandling = (error, req, res, next) => {
  console.log("This is Error handling");

  // Kiểm tra xem có status code error không nếu không gán là code : 500
  if (!error.statusCode) {
    error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
  const statuscode = error.statusCode;
  res.status(statuscode).json({
    statuscode : statuscode,
    Message : error.message || "Internal Server Error",
    stack : error.stack
  })
}