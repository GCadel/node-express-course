const { products } = require("../data.js");

const getProducts = (req, res) => {
  res.json(products);
};

const findProduct = (req, res) => {
  const foundProduct = products.find((product) => product.id == req.params.id);
  if (foundProduct) {
    res.status(200).json(foundProduct);
  } else {
    res.status(404).json({ message: "This product does not exist" });
  }
};

const addProduct = (req, res) => {
  const name = req.body.name;
  if (name) {
    products.push({ id: products.length + 1, name: name });
    res.status(201).json({ success: true, name: name });
  } else {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
};

const updateProduct = (req, res) => {
  const { id, name } = req.body;
  const foundProduct = products.find((product) => product.id == id);
  if (foundProduct) {
    foundProduct.name = name;
    res.status(201).json({ success: true, message: "Updated product" });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.body;
  const product = products.find((product) => product.id == id);
  if (product) {
    res.status(200).json({
      success: true,
      message: `Deleted ${product.name}`,
      data: products.filter((product) => product.id != id),
    });
  } else {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

const searchProduct = (req, res) => {
  let finalProduct = [...products];
  // Filter items based on search term

  if (req.query.search) {
    finalProduct = finalProduct.filter((item) =>
      item.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }
  // Return the first n limit items
  if (req.query.limit) {
    // Paginate query
    if (req.query.page && req.query.page > 1) {
      const offset = parseInt(req.query.page) * parseInt(req.query.limit);
      finalProduct = finalProduct.slice(
        offset - parseInt(req.query.limit),
        offset
      );
    } else {
      finalProduct = finalProduct.slice(0, req.query.limit);
    }
  }

  // Price limiter
  if (req.query.maxPrice) {
    finalProduct = finalProduct.filter(
      (item) => item.price <= parseFloat(req.query.maxPrice)
    );
  }
  res.status(200).json(finalProduct);
};

module.exports = {
  addProduct,
  getProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
