/* eslint-disable no-async-promise-executor */
import { formatter_slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
const get_board_detail = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      // Đây là tầng xử lý dữ liệu của dự án
      console.log("3, This is servise Board !");
      const response = await boardModel.get_board_detail(id);
      if (!response) {
        const error = new Error("Board not found");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
      }
      // Deep clone board tao ra 1 bản sao của board, không thay đổi board gốc
      // https://www.javascripttutorial.net/javascript-primitive-vs-reference-values/
      const result = cloneDeep(response);
      result.columns.forEach((column) => {
        column.cards = result.cards.filter((card) => card.columnId.toString() === column._id.toString());
      })
      // Xóa cards khỏi board
      delete result.cards;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
const createNew = (body) => new Promise(async (resolve, reject) => {
  try {
    // Đây là tầng xử lý dữ liệu của dự án
    console.log("3, This is servise Board !");

    // Gọi tới model DB create Board
    const response = await boardModel.createNew({
      ...body,
      slug: formatter_slugify(body.title)
    });

    // Tìm Board sau khi create nếu không có thì return lỗi
    const result = await boardModel.findOneById(response.insertedId);
    if (!result) {
      resolve({
        statusCode: StatusCodes.NOT_FOUND,
        message: "Error Created",
        error: 1
      });
    }
    resolve(result);
  } catch (error) {
    reject(error);
  }
});
const updateBoard = (boardId, body) => new Promise(async (resolve, reject) => {
  try {
    // Đây là tầng xử lý dữ liệu của dự án
    console.log("2, This is servise Board !");
    const updateData = {
      ...body,
      updatedAt : Date.now()
    }
    // Gọi tới model DB update Board
    const response_Model = await boardModel.updateBoard(boardId, updateData);
    resolve(response_Model)
  } catch (error) {
    reject(error)
  }
})
export const boardService = { createNew, get_board_detail, updateBoard };
