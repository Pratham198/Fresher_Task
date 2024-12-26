import React, { useState, useEffect } from 'react';
import TaskReportForm from '../Components/Dashboard/TaskReportForm';
import TaskList from '../Components/Dashboard/TaskList';
import axios from 'axios';
import '../Style/Pages/Dashboard.css';
import Navbar from '../Components/Dashboard/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [taskReports, setTaskReports] = useState([]);

  // Fetch task reports from the backend on component mount
  useEffect(() => {
    const fetchTaskReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/task-reports', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTaskReports(response.data);
      } catch (error) {
        console.error('Error fetching task reports', error);
      }
    };

    fetchTaskReports();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
        <div className="dashboard-content">
        <TaskReportForm onNewTaskReport={(report) => setTaskReports((prevReports) => [...prevReports, report])} />
        <TaskList taskReports={taskReports} setTaskReports={setTaskReports} />
        
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
