import express from 'express';
import { StatusCodes } from 'http-status-codes';
import RouterBoard from '~/routes/v1/boardRoute';
import RouterColumn from '~/routes/v1/columnRoute';
import RouterCard from '~/routes/v1/cardRoute';
const Router = express.Router();

// Check APIs v1/Status :
Router.get('/status', ( req, res) => {
  res.status(StatusCodes.OK).json({ message : "This is API Status!", StatusCode : StatusCodes.OK })
})

// API Board :
Router.use('/boards', RouterBoard)
// API column :
Router.use('/columns', RouterColumn)
// API card :
Router.use('/cards', RouterCard)
module.exports = Router