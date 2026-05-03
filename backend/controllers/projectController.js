const Project = require('../models/Project');
const Task = require('../models/Task');

const createProject = async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      members,
      createdBy: req.user._id
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find({}).populate('members', 'name email').populate('createdBy', 'name email');
    } else {
      projects = await Project.find({ members: req.user._id }).populate('members', 'name email').populate('createdBy', 'name email');
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email').populate('createdBy', 'name email');
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Cascade delete associated tasks
    await Task.deleteMany({ project: req.params.id });
    
    // Delete the project
    await project.deleteOne();
    
    res.json({ message: 'Project and associated tasks removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, deleteProject };
