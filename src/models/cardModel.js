import Joi from "joi";
import {
  validator_ObjectId,
  validator_ObjectId_message
} from "~/utils/validators";
const CARD_COLLECTION_NAME = "cards";
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(validator_ObjectId)
    .message(validator_ObjectId_message),
  columnId: Joi.string()
    .required()
    .pattern(validator_ObjectId)
    .message(validator_ObjectId_message),
  title: Joi.string().min(3).max(50).strict().trim(),
  description: Joi.string().optional(),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),

  _destroy: Joi.boolean().default(false)
});
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA
};
