import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { cardController } from '~/controllers/cardController';
import { cardValidation } from '~/validations/cardValidation';
const Router = express.Router(); // Tạo một instance của router
Router.route("/").get((req, res) => {
  res.status(StatusCodes.OK).json({ message: "GET : Get Card", Method: "get" });
}).post(cardValidation.createNew, cardController.createNew);
module.exports = Router;