/* eslint-disable no-async-promise-executor */
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
const createNew = (body) => new Promise( async (resolve, reject) => {
  try {
    console.log("3. This is cardService!");
    const response = await cardModel.createNew(body);
    const get_New_Card = await cardModel.findOneById(response.insertedId);
    if (get_New_Card) {
      // Xử lý dữ liệu data Trước khi trả về client
      // Cập nhật mảng cardOrderIds trong column
      await columnModel.pushColumnOrderIds(get_New_Card);
    }
    console.log("7. This is Service after createNew!");
    resolve(get_New_Card);
  } catch (error) {
    reject(error);
  }
});
export const cardService = { createNew };