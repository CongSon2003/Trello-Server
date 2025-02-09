import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { validator_ObjectId, validator_ObjectId_message } from "~/utils/validators";

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug : Joi.string().trim().min(3).strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  // item trong mảng columnOrderIds là ObjectId
  columnOrderIds : Joi.array().items(Joi.string().pattern(validator_ObjectId).message(validator_ObjectId_message)).default([]),

  createdAt : Joi.date().timestamp('javascript').default(Date.now),
  updatedAt : Joi.date().timestamp('javascript').default(null),
  _destroy : Joi.boolean().default(false)
})
const createBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly : false })
}
const createNew = async (data) => {
  try {
    console.log("Data : ", data);
    // validate sau khi create Board
    const validate_board = await createBeforeCreate(data);
    console.log("data before validate", validate_board);
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validate_board)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    console.log("Id : " + id);

    // create board in mongoDB
    const response = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id : new ObjectId(id)
    });
    return response
  } catch (error) {
    throw new Error(error)
  }
}
export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById
}