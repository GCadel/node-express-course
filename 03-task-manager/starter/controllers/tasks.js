const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch tasks", error: error.message });
  }
};

const getTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error("Item Does Not Exist");
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({
      message: `Unable to fetch task ${taskId}`,
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Unable to create task", error: error.message });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const result = await Task.findByIdAndUpdate(taskId, req.body);
    if (!result) {
      throw new Error("Task does not exist");
    }
    res.status(200).json({ message: `Updated Task ${taskId}` });
  } catch (error) {
    res.status(400).json({
      message: `Unable to update task ${taskId}`,
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const result = await Task.findByIdAndDelete(taskId);
    if (!result) {
      throw new Error("Task does not exist");
    }
    res.status(200).json({ message: `Deleted Task ${taskId}` });
  } catch (error) {
    res.status(400).json({
      message: `Unable to delete task ${taskId}`,
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
