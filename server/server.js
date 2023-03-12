const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoute = require("./routes/blog");

const app = express();

//connect cloud database
const connectDB = process.env.DATABASE;
mongoose
  .connect(connectDB, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("connect success"))
  .catch(() => console.log("connect error"));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use("/api", blogRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`start server in port ${port}`);
});
