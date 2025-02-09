import { formatter_slugify } from '~/utils/formatters'
const createNew = (body) => new Promise ((resolve, reject) => {
  try {
    // Đây là tầng xử lý dữ liệu của dự án
    console.log(body);
    console.log(formatter_slugify('Cong Son'));
    // const new
    resolve({
      ...body,
      slug : formatter_slugify(body.title)
    });
  } catch (error) {
    reject(error)
  }
})
export const boardService = { createNew }