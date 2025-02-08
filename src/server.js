/* eslint-disable no-unused-vars */
import express from "express";
// import { mapOrder } from "~/utils/sorts.js";

// connect Database :
import { connectToCluster, STOP_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import exitHook from "async-exit-hook";
import status from "~/routes/v1/index";
import bodyParser from "body-parser";
import { StatusCodes } from "http-status-codes";
import { errorHandling } from "~/middlewares/ErrorHandling";
const APP_SERVER = () => {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/JSON
  app.use(bodyParser.json());

  // use API V1
  app.use("/v1", status);

  // Middleware Error Handling
  app.use(errorHandling);

  // Khởi động server
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    app.use("/", (req, res) => {
      res.send("<h1 style = 'color : red'>This is heading 1</h1>");
    });
    console.log(
      `3. Hello CongSon Dev, I am running at host : ${env.APP_HOST}:${env.APP_PORT}`
    );
  });

  // Thực hiện cleanup trước khi server stop
  exitHook(() => {
    console.log("4. exit");
    STOP_DB();
  });
};

// Kiểm tra kết nối database (IIFE):
(async () => {
  try {
    console.log("1. Connecting to MongoDB...");
    await connectToCluster();

    // Run App :
    APP_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
