require("dotenv").config();

const connectDB = require("./db/connect.js");
const Product = require("./models/product.js");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB(process.env.MONGO);
    console.log("Deleting Old...");
    await Product.deleteMany();
    console.log("Repopulating...");
    await Product.create(jsonProducts);
    console.log("Successfully populated DB");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
