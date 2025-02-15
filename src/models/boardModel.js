import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { validator_ObjectId, validator_ObjectId_message } from "~/utils/validators";
import { columnModel } from "./columnModel";
import { cardModel } from "./cardModel";
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug : Joi.string().trim().min(3).strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type : Joi.string().trim().valid("public", "private").default("public").required(),

  // item trong mảng columnOrderIds là ObjectId
  columnOrderIds : Joi.array().items(Joi.string().pattern(validator_ObjectId).message(validator_ObjectId_message)).default([]),

  createdAt : Joi.date().timestamp('javascript').default(Date.now),
  updatedAt : Joi.date().timestamp('javascript').default(null),
  _destroy : Joi.boolean().default(false)
})
const validationBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly : false })
}
const createNew = async (data) => {
  try {
    console.log("4, This is Mobel Board!");
    console.log("5, Data before validate : ", data);
    // validate sau khi create Board
    const validate_board = await validationBeforeCreate(data);
    console.log("6, Data after validate : ", validate_board);
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validate_board)
    return createdBoard
  } catch (error) {
    throw new Error(error)
  }
}
const get_board_detail = async (id) => {
  try {
    const response = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match : { _id : new ObjectId(id), _destroy : false } }, // Lọc tài liều theo một điều kiện cho trước (id)
      { $lookup : {
        from : columnModel.COLUMN_COLLECTION_NAME, // Tên bảng cần join
        localField : '_id', // Trường trong bảng hiện tại
        foreignField : 'boardId', // Trường trong bảng cần join
        as : 'columns' // Tên của trường kết quả
      } },
      { $lookup : {
        from : cardModel.CARD_COLLECTION_NAME, // Tên bảng cần join
        localField : '_id', // Trường trong bảng hiện tại
        foreignField : 'boardId', // Trường trong bảng cần join
        as : 'cards' // Tên của trường kết quả
      } }
    ]).toArray()
    return response[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
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
  findOneById,
  get_board_detail
}