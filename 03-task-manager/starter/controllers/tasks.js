const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404).json({ message: "Item does not exist" });
    return;
  }
  res.status(200).json(task);
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to create task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const result = await Task.findByIdAndUpdate(taskId, req.body);
  if (!result) {
    res
      .status(404)
      .json({ message: "Unable to update task", error: "Task does not exist" });
    return;
  }
  res.status(200).json({ message: `Updated Task ${taskId}` });
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const result = await Task.findByIdAndDelete(taskId);
  if (!result) {
    res
      .status(404)
      .json({ message: "Unable to delete task", error: "Task does not exist" });
    return;
  }
  res.status(200).json({ message: `Deleted Task ${taskId}` });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
