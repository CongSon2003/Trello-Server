import express from 'express';
import { StatusCodes } from 'http-status-codes';
import RouterBoard from '~/routes/v1/boardRoute';
const Router = express.Router();

// Check APIs v1/Status :
Router.get('/status', ( req, res) => {
  res.status(StatusCodes.OK).json({ message : "This is API Status!", StatusCode : StatusCodes.OK })
})

// API Board :
Router.use('/boards', RouterBoard)

module.exports = Router