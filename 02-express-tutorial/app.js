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
  console.log(req.query);
  // Filter items based on search term
  const searchProducts = products.filter((item) =>
    item.name.toLowerCase().includes(req.query.search.toLowerCase())
  );
  // Return the first n limit items
  const limitProducts = searchProducts.slice(0, req.query.limit);
  res.json(limitProducts);
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
