const express = require("express");
const { people, products } = require("./data.js");

const app = express();

function logger(req, res, next) {
  const dateTime = new Date();
  console.log(dateTime, req.method, req.url);
  next();
}

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use([], logger);

app.get("/api/v1/people", (req, res) => {
  res.json(people);
});

app.post("/api/v1/people", (req, res) => {
  const name = req.body.name;
  if (name) {
    people.push({ id: people.length + 1, name: name });
    res.status(201).json({ success: true, name: name });
  } else {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
});

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
