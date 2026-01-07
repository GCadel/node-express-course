const express = require("express");
const taskRouter = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
require("dotenv").config();

const app = express();

app.use(express.static("./public"));
app.use(express.json());
const PORT = 3000;

app.use("/api/v1/tasks", taskRouter);

app.get("/*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
