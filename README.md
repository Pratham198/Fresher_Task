# Daily Task Report Web Portal

A MERN stack project for managing daily task reports with user authentication and CRUD functionality.

---

## Features

### **Frontend**
- Built with React.js.
- Components/Pages:
  - **Login Page**: Form with username and password fields.
  - **Dashboard Page**: Displays a list of tasks and allows task management.
  - **Task Report Form**: Fields for date, task description, hours worked, and status.
  - **Logout Button**: Ends the session.

### **Backend**
- Built with Node.js and Express.js.
- Routes for:
  - **User Authentication**: Login and Logout functionality with password encryption.
  - **Task Report Management**: Create, Read, Update, and Delete (CRUD) task reports.

### **Database**
- MongoDB collections:
  - **Users**: Stores user credentials.
  - **Task Reports**: Stores task details linked to users.

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/your-username/daily-task-report.git
cd daily-task-report
