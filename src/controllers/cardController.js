import { StatusCodes } from 'http-status-codes';
import { cardService } from '~/services/cardService';
const createNew = async (req, res, next) => {
  try {
    console.log("2. This is cardController : fisrt line!");
    const result = await cardService.createNew(req.body);
    console.log("8. This is cardController : second line!");
    res.status(StatusCodes.OK).json({ message: "Create new card successfully!", data: result });
  } catch (error) {
    const messageError = new Error(error).message;
    const statusCode = StatusCodes.BAD_REQUEST;
    next({ message: messageError, statusCode });
  }
}
export const cardController = { createNew }