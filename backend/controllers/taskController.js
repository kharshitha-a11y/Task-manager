const Task = require('../models/Task');
const Project = require('../models/Project');

const createTask = async (req, res) => {
  const { title, description, project, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy: req.user._id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'Admin') {
      tasks = await Task.find({}).populate('project', 'name').populate('assignedTo', 'name email').populate('createdBy', 'name email');
    } else {
      tasks = await Task.find({ assignedTo: req.user._id }).populate('project', 'name').populate('assignedTo', 'name email').populate('createdBy', 'name email');
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('project', 'name').populate('assignedTo', 'name email').populate('createdBy', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role !== 'Admin' && task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, getTasksByProject, updateTaskStatus, deleteTask };
