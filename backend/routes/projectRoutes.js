const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

router.route('/')
  .post(protect, roleCheck(['Admin']), createProject)
  .get(protect, getProjects);

router.route('/:id')
  .get(protect, getProjectById)
  .delete(protect, roleCheck(['Admin']), deleteProject);

module.exports = router;
