/* eslint-disable no-async-promise-executor */
import { formatter_slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
const get_board_detail = (id) => new Promise(async (resolve, reject) => {
  try {
    // Đây là tầng xử lý dữ liệu của dự án
    console.log("3, This is servise Board !");
    const response = await boardModel.get_board_detail(id);
    if (!response) {
      throw new Error('Board not found!');
    }
    resolve(response)
  } catch (error) {
    reject(error)
  }
})
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
export const boardService = { createNew, get_board_detail };
