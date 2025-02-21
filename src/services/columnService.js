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
export const columnService = { createNew };