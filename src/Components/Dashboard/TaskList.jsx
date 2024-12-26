import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone'; // Import moment-timezone
import { FaCircleArrowLeft } from 'react-icons/fa6'; // Import arrow icons
import { FaArrowCircleRight } from 'react-icons/fa'; // Import arrow icons
import { toast } from 'react-toastify'; // Import toastify
import '../../Style/Dashboard/TaskList.css';
import exampleImage from '../../images/TaskList.png'; // Add your image path here

const TaskList = () => {
  const [taskReports, setTaskReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch task reports on component mount
  useEffect(() => {
    const fetchTaskReports = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage
    
      try {
        const response = await axios.get('http://localhost:5000/api/task-reports', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        });
        setTaskReports(response.data);
      } catch (error) {
        console.error('Error fetching task reports', error);
      }
    };
    
    fetchTaskReports();
  }, []);

  // Handle task deletion
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Get the token

    try {
      await axios.delete(`/api/task-reports/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });
      setTaskReports((prevReports) => prevReports.filter((report) => report._id !== id));
      toast.success('Task report deleted successfully!'); // Success toast
    } catch (err) {
      console.error('Error deleting task report', err);
      toast.error('Error deleting task report'); // Error toast
    }
  };

  // Handle task update
  const handleUpdate = async (id, updatedReport) => {
    const token = localStorage.getItem('token'); // Get the token

    // Check if the task is already completed
    const existingReport = taskReports.find(report => report._id === id);
    
    if (existingReport.status === 'Completed') {
      toast.info('This task is already marked as Completed.');
      return; // Stop further execution
    }

    try {
      const response = await axios.put(`/api/task-reports/${id}`, updatedReport, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
      });

      // Update the task list with the new task data
      setTaskReports((prevReports) =>
        prevReports.map((report) =>
          report._id === id ? { ...report, ...response.data } : report
        )
      );
      toast.success('Task report updated successfully!'); // Success toast
    } catch (err) {
      console.error('Error updating task report', err);
      toast.error('Error updating task report'); // Error toast
    }
  };

  // Paginate tasks (2 tasks per page)
  const tasksToShow = taskReports.slice(currentPage * 2, currentPage * 2 + 2);

  // Disable left button on first page, and right button on last page
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= Math.floor(taskReports.length / 2);

  return (
    <div className="task-list-container">
      <div className="task-list">
        <h3>Your Task Reports</h3>
        {taskReports.length === 0 ? (
          <p>No task reports available.</p>
        ) : (
          <ul>
            {tasksToShow.map((report) => (
              <li key={report._id} className="task-item">
                <p><strong>Date:</strong> {moment.utc(report.date).tz('Asia/Kolkata').format('DD/MM/YYYY')}</p> {/* Adjust the format for Indian Time (IST) */}
                <p><strong>Description:</strong> {report.description}</p>
                <p><strong>Hours Worked:</strong> {report.hoursWorked}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <div className="task-actions">
                  <button onClick={() => handleDelete(report._id)} className="delete-btn">Delete</button>
                  <button
                    onClick={() =>
                      handleUpdate(report._id, { ...report, status: 'Completed' })
                    }
                    className="update-btn"
                  >
                    Mark as Completed
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination buttons */}
        <div className="pagination">
          <FaCircleArrowLeft
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className={`pagination-btn ${isFirstPage ? 'disabled' : ''}`}
          />
          <FaArrowCircleRight
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.floor(taskReports.length / 2)))}
            className={`pagination-btn ${isLastPage ? 'disabled' : ''}`}
          />
        </div>
      </div>

      {/* Right-side image */}
      <div className="task-list-image">
        <img src={exampleImage} alt="Task Report Example" />
      </div>
    </div>
  );
};

export default TaskList;
