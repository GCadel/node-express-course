const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const query = { name: "vase table" };
  const products = await Product.find(query);
  res.status(200).json({ amount: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  const products = await Product.find(queryObject);

  res.status(200).json({
    amount: products.length,
    query: queryObject,
    raw_query: req.query,
    products,
  });
};

module.exports = { getAllProducts, getAllProductsStatic };
