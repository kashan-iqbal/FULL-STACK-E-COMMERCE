const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
// route imports
const authRoute = require("./route/authroute");
const categoryRoute = require("./route/categoryRoute");
const productRoute = require("./route/productRoute");

// configure env
dotenv.config();

// databse connect
connectDB();

// rest object
const app = express();

// rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome To Ecommerce App </h1>");
});

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoute);

// port setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.bgCyan.white);
});
