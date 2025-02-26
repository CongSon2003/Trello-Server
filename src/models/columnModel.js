import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
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
  ).default([]),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});
const validationBeforeCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  });
}
const createNew = async (data) => {
  try {
    console.log("4. This is columnModel!");
    console.log("5. Validate data before creation : ", data);
    const validate_column = await validationBeforeCreate(data);
    const newColumn = {
      ...validate_column,
      boardId : new ObjectId(validate_column.boardId)
    }
    console.log("6. Data after authentication : ", validate_column);

    // Tạo column trong mongoDB
    const createdColumn = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(newColumn);
    return createdColumn;
  } catch (error) {
    throw new Error(error);
  }
}
const updateNew = async (columnId, data) => {
  try {
    console.log("4, This is columnModel");
    console.log(columnId, data);
    const response = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id : new ObjectId(columnId) },
      { $set : data },
      { ReturnDocument : true }
    )
    return response.value
  } catch (error) {
    throw new Error(error)
  }
}
// Push cardId vào cuối mạng cardOrderIds của column
const pushColumnOrderIds = async (card) => {
  try {
    console.log(card);
    const response = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id : card.columnId },
      { $push : { cardOrderIds : card._id } },
      { returnDocument: 'after' }
    )
    return response
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    // create board in mongoDB
    const response = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushColumnOrderIds,
  updateNew
};
