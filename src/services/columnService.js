/* eslint-disable no-async-promise-executor */
import { columnModel } from "~/models/columnModel";
import { boardModel } from "~/models/boardModel";
const createNew = (body) => new Promise( async (resolve, reject) => {
  try {
    console.log("3. This is columnService!");
    const response = await columnModel.createNew(body);
    if (!response) {
      throw new Error("Error server")
    }
    const get_New_Column = await columnModel.findOneById(response.insertedId);
    if (get_New_Column) {
      // Xử lý dữ liệu data Trước khi trả về client
      get_New_Column.cards= [];

      // Cập nhật mảng columnOrderIds trong board
      const result = await boardModel.pushColumnOrderIds(get_New_Column)
      console.log(result);
    }
    console.log("7. This is Service after createNew!");
    resolve(get_New_Column);
  } catch (error) {
    reject(error);
  }
});
const updateNew = (columnId, body) => new Promise(async (resolve, reject) => {
  try {
    // Đây là tầng xử lý dữ liệu của dự án
    console.log("3. This is columnService!");
    const update_column_data = {
      ...body,
      updatedAt : Date.now()
    }
    // Gọi tới model DB update Column
    const response_Model = await columnModel.updateNew(columnId, update_column_data)
    resolve(response_Model)
  } catch (error) {
    reject(error)
  }
})
export const columnService = { createNew, updateNew };