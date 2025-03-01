/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";
const createNew = async (req, res, next) => {
  try {
    console.log("2, This is Controller Board of createNew : First");
    console.log("Input data body : ", req.body);

    // Điều hướng sang tầng servise
    const response = await boardService.createNew(req.body);
    console.log("7, This is Controller Board of createNew : second");
    if (response.error === 1) {
      return res.status(StatusCodes.NOT_FOUND).json(response);
    } else {
      console.log("8, Dữ liệu của board đã createNew : \n", response);
    }
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};
const get_board_detail = async (req, res, next) => {
  try {
    console.log("1, This is Controller of get_board_detail : First");
    const boardId = req.params.id;
    console.log("2, Input data body (id) : ", boardId);

    // Điều hướng sang tầng service :
    const response = await boardService.get_board_detail(boardId);
    console.log("4, This is Controller of get_board_detail : Second");
    console.log("Data đã tìm bằng Id : ", response);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};
const updateBoard = async (req, res, next) => {
  try {
    console.log("1, This is Controller of updateBoard : fisrt ");
    const boardId = req.params.id;
    console.log("Data được gửi để update : ", req.body);
    // Điều hướng sang tầng servise :
    const response_Servise = await boardService.updateBoard(boardId, req.body)
    if (!response_Servise) {
      const err = new Error("BAD REQUEST")
      err.status = StatusCodes.BAD_REQUEST;
      next(err)
    }
    console.log("3, This is Controller of get_board_detail : Second");
    res.status(StatusCodes.OK).json(response_Servise);
  } catch (error) {
    next(error)
  }
}
export const boardController = { createNew, get_board_detail, updateBoard };
