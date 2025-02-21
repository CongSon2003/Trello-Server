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
    .message(validator_ObjectId_message),
  columnId: Joi.string()
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
export const cardValidation = { createNew }