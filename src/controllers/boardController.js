/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
const createNew = async (req, res, next) => {
  try {
    console.log("This is Controller Board");
    console.log("data body: ", req.body);
    console.log("data query : ", req.query);
    res.status(StatusCodes.CREATED).json({ message: "POST FROM CONTROLLER ", Method: "post" });
  } catch (error) {
    next(error);
  }
};
export const boardController = { createNew };
