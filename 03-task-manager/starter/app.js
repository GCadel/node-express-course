const express = require("express");
const taskRouter = require("./routes/tasks.js");

const app = express();
const PORT = 3000;

app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
