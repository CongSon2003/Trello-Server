import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
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
const validationBeforeCreate = async (data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly : true })
}
const createNew = async (data) => {
  try {
    console.log("4. This is columnModel!");
    console.log("5. Validate data before creation : ", data);
    const validate_card = await validationBeforeCreate(data);
    const newCard = {
      ...validate_card,
      boardId : new ObjectId(validate_card.boardId),
      columnId : new ObjectId(validate_card.columnId)
    }
    console.log("6. Data after authentication : ", validate_card);
    const create_card = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(newCard);
    return create_card
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    // create board in mongoDB
    const response = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOneById
};
