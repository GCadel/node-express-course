const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const query = { name: "vase table" };
  const products = await Product.find({}).sort("-name");
  res.status(200).json({ amount: products.length, products });
};

const getAllProducts = async (req, res) => {
  // const { featured, company, name, sort, fields, limit } = req.query;
  const { featured, company, name, sort, fields } = req.query;
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
    const sortFieldList = sort.split(",").join(" ");
    queryObject.sortFieldList = [...sortFieldList.split(" ")];
    result = result.sort(sortFieldList);
  } else {
    queryObject.sortFieldList = ["createdAt"];
    result = result.sort("createdAt");
  }

  if (fields) {
    const selectedFieldList = fields.split(",").join(" ");
    queryObject.selectedFieldList = [...selectedFieldList.split(" ")];
    result = result.select(selectedFieldList);
  } else {
    const defaultFieldList = ["name", "price", "rating"];
    queryObject.selectedFieldList = defaultFieldList;
    result = result.select(defaultFieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // if (limit) {
  //   if (isNaN(Number(limit))) {
  //     queryObject.limit = 10;
  //     result = result.limit(10);
  //   } else {
  //     queryObject.limit = Number(limit);
  //     result = result.limit(Number(limit));
  //   }
  // } else {
  //   queryObject.limit = 10;
  //   result = result.limit(10);
  // }

  const products = await result;
  res.status(200).json({
    amount: products.length,
    query: queryObject,
    raw_query: req.query,
    products,
  });
};

module.exports = { getAllProducts, getAllProductsStatic };
