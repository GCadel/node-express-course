const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../errors/custom-error.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks, amount: tasks.length });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  // const task = await Task.findById(taskId);
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(
      createCustomError(`Unable to find task with id ${taskId}`, 404)
    );
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskID = req.params.id;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomError(`Unable to find task with id ${taskID}`, 404)
    );
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const result = await Task.findByIdAndDelete(taskId);
  if (!result) {
    return next(
      createCustomError(`Unable to find task with id ${taskId}`, 404)
    );
  }
  res.status(200).json({ message: `Deleted Task ${taskId}` });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
