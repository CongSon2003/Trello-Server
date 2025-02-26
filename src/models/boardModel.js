import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import {
  validator_ObjectId,
  validator_ObjectId_message
} from "~/utils/validators";
import { columnModel } from "./columnModel";
import { cardModel } from "./cardModel";
const NOT_ALLOWED_UPDATE_FIELDS = ['_id', 'createdAt'];
const BOARD_COLLECTION_NAME = "boards";
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().trim().min(3).strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string()
    .trim()
    .valid("public", "private")
    .default("public")
    .required(),

  // item trong mảng columnOrderIds là ObjectId
  columnOrderIds: Joi.array()
    .items(
      Joi.string()
        .pattern(validator_ObjectId)
        .message(validator_ObjectId_message)
    )
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false)
});
const validationBeforeCreate = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  });
};
const createNew = async (data) => {
  try {
    console.log("4, This is Mobel Board!");
    console.log("5, Data before validate : ", data);

    // validate sau khi create Board
    const validate_board = await validationBeforeCreate(data);
    console.log("6, Data after validate : ", validate_board);

    // create board in mongoDB
    const createdBoard = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validate_board);
    return createdBoard;
  } catch (error) {
    throw new Error(error);
  }
};
const get_board_detail = async (id) => {
  try {
    const response = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        { $match: { _id: new ObjectId(id), _destroy: false } }, // Lọc tài liều theo một điều kiện cho trước (id)
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME, // Tên bảng cần join
            localField: "_id", // Trường trong bảng hiện tại
            foreignField: "boardId", // Trường trong bảng cần join
            as: "columns" // Tên của trường kết quả
          }
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME, // Tên bảng cần join
            localField: "_id", // Trường trong bảng hiện tại
            foreignField: "boardId", // Trường trong bảng cần join
            as: "cards" // Tên của trường kết quả
          }
        }
      ])
      .toArray();
    return response[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};
const updateBoard = async (boardId, updateData) => {
  try {
    console.log("This is Mobel Board!");
    console.log(updateData);
    // Lọc những field mà chúng ta không cho phép cập nhật :
    Object.keys(updateData).forEach(field => {
      if (NOT_ALLOWED_UPDATE_FIELDS.includes(field)) {
        delete updateData[field]
      }
    });
    console.log(updateData);
    const response = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(boardId) }, // Điều kiện tìm kiếm
      { $set: updateData }, // Cập nhật
      { returnDocument: 'after' } // Tùy chọn để trả về tài liệu sau khi cập nhật
    );
    return response.value
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    // create board in mongoDB
    const response = await GET_DB()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
// Push columnId vào cuối mạng columnOrderIds của board
const pushColumnOrderIds = async (column) => {
  try {
    console.log(column);
    const response = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id : column.boardId },
      { $push : { columnOrderIds : column._id } },
      { returnDocument: 'after' }
    )
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
  get_board_detail,
  pushColumnOrderIds,
  updateBoard
};
