/* eslint-disable no-async-promise-executor */
import { formatter_slugify } from '~/utils/formatters';
import { boardModel } from '~/models/boardModel';
import { StatusCodes } from 'http-status-codes';
const createNew = (body) => new Promise (async (resolve, reject) => {
  try {
    // Đây là tầng xử lý dữ liệu của dự án
    console.log(body);
    console.log(formatter_slugify('Cong Son'));

    // Gọi tới model DB create Board
    const response = await boardModel.createNew({
      ...body,
      slug : formatter_slugify(body.title),
      columnOrderIds : ['67a8e36cbcfeeafebaf7d7cd']
    })

    // Tìm Board sau khi create nếu không có thì return lỗi
    const result = await boardModel.findOneById(response.insertedId)
    if (!result) {
      resolve({
        statusCode : StatusCodes.NOT_FOUND,
        message : "Error Created",
        error : 1
      })
    }
    resolve(result);
  } catch (error) {
    reject(error)
  }
})
export const boardService = { createNew }