import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import {
  validator_ObjectId,
  validator_ObjectId_message
} from "~/utils/validators";
const schema = Joi.object({
  title : Joi.string().required().min(3).max(50).trim().strict().messages({
    "any.required": "Title is required",
    "string.empty": "Title is not allowed to be empty",
    "string.min": "Title length must be at least 3 characters long",
    "string.max": "Title length must be less than or equal to 50 characters long",
    "string.trim": "Title must not have leading or trailing whitespace"
  }),
  boardId: Joi.string()
    .required()
    .pattern(validator_ObjectId)
    .message(validator_ObjectId_message)
});
const createNew = async (req, res, next) => {
  try {
    console.log("1. Verify customer submitted data!"); // Xác minh dữ liệu được gửi từ khách hàng
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const messageError = new Error(error).message;
    const statusCode = StatusCodes.BAD_REQUEST;
    next({ message: messageError, statusCode });
  }
}
const updateNew = async (req, res, next) => {
  const schema_update = Joi.object({
    title : Joi.string().min(3).max(50).trim().strict(),
    cardOrderedIds : Joi.array().items(
      Joi.string().pattern(validator_ObjectId).message(validator_ObjectId_message)).default([]),
    boardId: Joi.string().pattern(validator_ObjectId).message(validator_ObjectId_message)
  })
  try {
    console.log("1. Verify customer submitted data!");
    await schema_update.validateAsync(req.body, { abortEarly : true, allowUnknown : true })
    next();
  } catch (error) {
    next(error)
  }
}
export const columnValidation = { createNew, updateNew }