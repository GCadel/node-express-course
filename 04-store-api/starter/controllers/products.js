const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const query = { name: "vase table" };
  const products = await Product.find({}).sort("-name");
  res.status(200).json({ amount: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
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

  let result = Product.find(queryObject);

  if (sort) {
    const fields = sort.split(",").join(" ");
    result = result.sort(fields);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;
  res.status(200).json({
    amount: products.length,
    query: queryObject,
    sortBy: sort,
    raw_query: req.query,
    products,
  });
};

module.exports = { getAllProducts, getAllProductsStatic };
