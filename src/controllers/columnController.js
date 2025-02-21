import { StatusCodes } from 'http-status-codes';
import { columnService } from '~/services/columnService';
const createNew = async (req, res, next) => {
  try {
    console.log("2. This is columnController : fisrt line!");
    const result = await columnService.createNew(req.body);
    console.log(result);
    console.log("8. This is columnController : second line!");
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    const messageError = new Error(error).message;
    const statusCode = StatusCodes.BAD_REQUEST;
    next({ message: messageError, statusCode });
  }
}
export const columnController = { createNew }