require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const express = require("express");
const listEndPoints = require("list_end_points");
const connectDatabase = require("./config/retailLoop");


const app = express();
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("This is the Retailloop API Server, Connected Successfully");
});

// const authRouters = require("./routes/authenticaton");
// app.use("/retailloop/sample/api/v1/authentication", authRouters);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

listEndPoints.default(app);
const start = async () => {
  try {
    await connectDatabase(process.env.MONGODBURL);
    app.listen(PORT, () => console.log(`Retailloop Server Listening at Port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
