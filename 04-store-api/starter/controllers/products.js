const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const query = { name: "vase table" };
  const products = await Product.find({}).sort("-name");
  res.status(200).json({ amount: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => {
      return `-${operatorMap[match]}-`;
    });
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
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

  const products = await result;
  res.status(200).json({
    amount: products.length,
    query: { queryObject, page, limit, skip },
    products,
  });
};

module.exports = { getAllProducts, getAllProductsStatic };
