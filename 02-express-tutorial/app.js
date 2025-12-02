const express = require("express");
const { products } = require("./data.js");

const app = express();
app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const product = products.find(
    (item) => item.id === parseInt(req.params.productID)
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "This product does not exist" });
  }
});

app.get("/api/v1/query", (req, res) => {
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
  res.json(finalProduct);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Got data!");
});

app.all("/*", (req, res) => {
  res.send("Uh oh, we couldn't find that page!");
});

app.listen(3000, () => {
  console.log("Listening");
});
