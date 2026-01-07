const mongoose = require("mongoose");

const maxChar = 40;

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task title required"],
    trim: true,
    maxlength: [maxChar, `Title must be no more than ${maxChar} characters`],
  },
  isComplete: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
