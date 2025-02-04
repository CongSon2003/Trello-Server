/* eslint-disable no-console */
import express from "express";
// import { mapOrder } from "~/utils/sorts.js";
// connect Database :
import { connectToCluster, GET_DB } from "~/config/mongodb";
const APP_SERVER = () => {
  const app = express();
  const hostname = "localhost";
  const port = 8017;
  app.get("/", async (req, res) => {
    console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });
  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello CongSon Dev, I am running at host : ${hostname}:${port}`
    );
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
})()
// connectToCluster()
//   .then(() => APP_SERVER())
//   .catch((error) => {
//     console.log(error), process.exit(0);
//   });
