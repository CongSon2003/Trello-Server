import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";
import { boardController } from "~/controllers/boardController";
const Router = express.Router(); // Tạo một instance của router

Router.route("/")
  .get((req, res) => {
    res
      .status(StatusCodes.OK)
      .json({ message: "GET : Get Board", Method: "get" });
  })
  .post(boardValidation.createNew, boardController.createNew);
Router.route("/:id").get(boardController.get_board_detail).put(boardValidation.updateNew, boardController.updateBoard);
module.exports = Router;
