/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { validator_ObjectId, validator_ObjectId_message } from "~/utils/validators";

const schema = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict().messages({
    "any.required": "Title is required",
    "string.empty": "Title is not allowed to be empty",
    "string.min": "Title length must be at least 3 characters long",
    "string.max":
      "Title length must be less than or equal to 50 characters long",
    "string.trim": "Title must not have leading or trailing whitespace"
  }),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type : Joi.string().trim().valid("public", "private").default("public").required()
});

const createNew = async (req, res, next) => {
  try {
    console.log("1, This is Validation Board!");
    // abortEarly : trả về hết lỗi
    await schema.validateAsync(req.body, { abortEarly: false });
    next()
  } catch (error) {
    console.log(new Error(error));
    const messageError = new Error(error).message;
    const throwError = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, messageError);
    next(throwError);
  }
}
const updateNew = async (req, res, next) => {
  const schema_update_board = Joi.object({
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(validator_ObjectId).message(validator_ObjectId_message)
    ).default([]),
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type : Joi.string().trim().valid("public", "private").default("public")
  })
  try {
    console.log("This is Validation Board!");
    await schema_update_board.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown : true // Cho phép unknow,
    })
    next()
  } catch (error) {
    console.log(new Error(error));
    const messageError = new Error(error).message;
    const throwError = new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, messageError);
    next(throwError);
  }
}
export const boardValidation = { createNew, updateNew }
