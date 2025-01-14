import express from "express";
const app = express();
const port = 3000;
const hostname = "localhost";
app.get("/", function (req, res) {
  res.send("<h1>CongSon2003</h1>");
});

app.listen(port, () => {
  console.log(
    `Node.js HTTP server is running server at http://${hostname}:${port}/`
  );
});
