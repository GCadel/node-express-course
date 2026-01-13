const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Product Name Required"] },
  price: { type: Number, required: [true, "Product Price Required"] },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum:["ikea", "liddy", "caressa", "marcos"]
  },
});

module.exports = mongoose.model("Product", productSchema);
