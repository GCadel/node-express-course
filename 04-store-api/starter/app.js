require("dotenv").config();
require("express-async-errors");

const express = require("express");
const notFoundMiddleware = require("./middleware/not-found.js");
const errorMiddleware = require("./middleware/error-handler.js");
const connectDB = require("./db/connect.js");
const productsRouter = require("./routes/products.js");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">Products Route</a>`);
});

app.use("/api/v1/products", productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect db
    await connectDB(process.env.MONGO);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
