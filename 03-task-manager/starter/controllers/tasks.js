const getAllTasks = (req, res) => {
  res.status(200).json({ message: "Get All Tasks" });
};

const getTask = (req, res) => {
  const taskId = req.params.id;
  res.status(200).json({ message: `Get Task ${taskId}` });
};

const createTask = (req, res) => {
  res.status(200).json({ message: "Get All Tasks" });
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  res.status(200).json({ message: `Update Task ${taskId}` });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  res.status(200).json({ message: `Delete Task ${taskId}` });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
