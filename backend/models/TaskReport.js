const mongoose = require('mongoose');

const TaskReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  hoursWorked: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const TaskReport = mongoose.model('TaskReport', TaskReportSchema);

module.exports = TaskReport;
