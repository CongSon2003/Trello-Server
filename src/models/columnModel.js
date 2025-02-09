import Joi from "joi";
import {
  validator_ObjectId,
  validator_ObjectId_message
} from "~/utils/validators";
const COLUMN_COLLECTION_NAME = "columns";
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(validator_ObjectId)
    .message(validator_ObjectId_message),
  title: Joi.string().min(3).max(50).strict().trim(),

  // Các item trong mảng cardOrderIds là ObjectId
  cardOrderIds: Joi.array().items(
    Joi.string().pattern(validator_ObjectId).message(validator_ObjectId_message)
  ),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA
};
