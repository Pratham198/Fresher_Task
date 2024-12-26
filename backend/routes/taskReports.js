// routes/taskReports.js
const express = require('express');
const router = express.Router();
const TaskReport = require('../models/TaskReport');
const { verifyToken } = require('../middleware/auth'); // A middleware for checking authentication

// GET all task reports for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const taskReports = await TaskReport.find({ user: req.user.id });
    res.status(200).json(taskReports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task reports', error: err });
  }
});

// POST a new task report
router.post('/', verifyToken, async (req, res) => {
  const { date, description, hoursWorked, status } = req.body;

  try {
    const newReport = new TaskReport({
      date,
      description,
      hoursWorked,
      status,
      user: req.user.id, // Assuming the user is authenticated
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task report', error: err });
  }
});

// PUT (update) a task report by ID
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { date, description, hoursWorked, status } = req.body;

  try {
    const updatedReport = await TaskReport.findByIdAndUpdate(
      id,
      { date, description, hoursWorked, status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: 'Task report not found' });
    }

    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task report', error: err });
  }
});

// DELETE a task report by ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReport = await TaskReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: 'Task report not found' });
    }

    res.status(200).json({ message: 'Task report deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task report', error: err });
  }
});

module.exports = router;
