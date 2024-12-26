import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import '../../Style/Dashboard/TaskReportForm.css';
import exampleImage from '../../images/TaskReport.png';

const TaskReportForm = ({ onNewTaskReport }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [hoursWorked, setHoursWorked] = useState(1); // Default value set to 1
  const [status, setStatus] = useState('Pending');

  const token = localStorage.getItem('token');

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the description exceeds 300 characters
    if (description.length > 300) {
      toast.error('Task description cannot exceed 300 characters!');
      return;
    }

    try {
      const newReport = { date, description, hoursWorked, status };
      const response = await axios.post('/api/task-reports', newReport, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onNewTaskReport(response.data); // Update the task list

      // Show toast message on success
      toast.success('Task Report submitted successfully!');

      // Reset form
      setDate('');
      setDescription('');
      setHoursWorked(1); // Reset to default value
      setStatus('Pending');
    } catch (err) {
      console.error('Error adding task report', err);
      toast.error('Error adding task report');
    }
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input exceeds 300 characters and show a toast message
    if (inputValue.length > 300) {
      toast.error('Task description cannot exceed 300 characters!');
    } else {
      setDescription(inputValue);
    }
  };

  return (
    <div className="trf-container">
      <img src={exampleImage} alt="Example" className="trf-left-image" />
      <div className="trf-form">
        <h3>Submit Daily Task Report</h3>
        <form onSubmit={handleSubmit} className="trf-form-wrapper">
          <div className="trf-left">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={today} // Set today's date as the minimum
              max={today} // Set today's date as the maximum
            />
            <label>Hours Worked:</label>
            <input
              type="number"
              value={hoursWorked}
              onChange={(e) => {
                const value = Math.max(1, Math.min(12, Number(e.target.value)));
                setHoursWorked(value);
              }}
              onBlur={(e) => {
                if (!e.target.value) setHoursWorked(1); // Default to 1 if empty
              }}
              min="1"
              max="12"
              step="1"
              required
            />
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div className="trf-right">
            <label>Task Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange} // Update description with character limit
              required
            />
          </div>
          <div className="trf-footer">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskReportForm;
