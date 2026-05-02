const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTasksByProject, updateTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { roleCheck } = require('../middleware/roleCheck');

router.route('/')
  .post(protect, roleCheck(['Admin']), createTask)
  .get(protect, getTasks);

router.route('/project/:projectId')
  .get(protect, getTasksByProject);

router.route('/:id/status')
  .put(protect, updateTaskStatus);

module.exports = router;
