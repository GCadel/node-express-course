const getAllProductsStatic = async (req, res) => {
  throw new Error("Testing async errors");
  res.status(200).json({ message: "Products testing route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ message: "Products route" });
};

module.exports = { getAllProducts, getAllProductsStatic };
