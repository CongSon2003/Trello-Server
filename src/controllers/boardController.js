/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";
const createNew = async (req, res, next) => {
  try {
    console.log("This is Controller Board");
    console.log("data body: ", req.body);

    // Điều hướng sang tầng servise
    const response = await boardService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};
export const boardController = { createNew };
