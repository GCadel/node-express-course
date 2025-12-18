const express = require("express");
const { people, products } = require("./data.js");
const peopleRouter = require("./routes/people.js");
const productRouter = require("./routes/products.js");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

function logger(req, res, next) {
  const dateTime = new Date();
  console.log(dateTime, req.method, req.url);
  next();
}

function auth(req, res, next) {
  if (!req.cookies.name) {
    res.status(401).json({ success: false, message: "Not logged in" });
  } else {
    req.user.value = req.cookies.name;
  }
}

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use([], logger, auth);

app.use("/api/v1/people", peopleRouter);
app.use("/api/v1/products", productRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
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
