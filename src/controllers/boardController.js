/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";
const createNew = async (req, res, next) => {
  try {
    console.log("This is Controller Board : First");
    console.log("data body: ", req.body);

    // Điều hướng sang tầng servise
    const response = await boardService.createNew(req.body);
    console.log("This is Controller Board : second");
    console.log(response);
    if (response.error === 1) {
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};
export const boardController = { createNew };
