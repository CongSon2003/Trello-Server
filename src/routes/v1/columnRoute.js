import express from "express";
import { StatusCodes } from "http-status-codes";
import { columnValidation } from "~/validations/columnValidation";
import { columnController } from "~/controllers/columnController";
const Router = express.Router(); // Tạo một instance của router

Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET : Get Column", Method: "get" });
}).post(columnValidation.createNew, columnController.createNew);
module.exports = Router;
