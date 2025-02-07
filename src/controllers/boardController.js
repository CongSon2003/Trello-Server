/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    console.log("This is Controller Board")
    console.log("data body: ", req.body);
    console.log("data query : ", req.query)
    res.status(StatusCodes.CREATED).json({ message: "POST FROM CONTROLLER ", Method: "post" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error : error.message
    })
  }
}
export const boardController = { createNew }