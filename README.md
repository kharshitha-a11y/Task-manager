# Team Task Manager

A production-ready Team Task Manager web application built with the MERN stack (MongoDB, Express, React, Node.js). It features role-based access control (Admin/Member) using JWT authentication, allowing teams to manage projects and track tasks efficiently.

## Features

*   **Role-Based Access Control:** 
    *   **Admin:** Can create projects, view all projects/tasks, assign tasks, and manage users.
    *   **Member:** Can view projects they are a part of, view their assigned tasks, and update the status of their assigned tasks.
*   **Project Management:** Create and manage projects, assign members to projects.
*   **Task Tracking:** Create tasks within projects, assign tasks to members, track status (To Do, In Progress, Done).
*   **Authentication:** Secure JWT-based authentication and password hashing with bcrypt.

## Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Context API.
*   **Backend:** Node.js, Express, Mongoose (MongoDB).
*   **Authentication:** JSON Web Tokens (JWT).

## Setup & Running Locally

### Prerequisites

*   Node.js (v18 or higher recommended)
*   MongoDB instance (local or Atlas)

### 1. Clone the repository
\`\`\`bash
git clone <repository_url>
cd <repository_name>
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file in the `backend` directory:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
\`\`\`

Run the backend development server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
\`\`\`bash
cd frontend
npm install
\`\`\`

Run the frontend development server:
\`\`\`bash
npm run dev
\`\`\`

## Deployment to Railway

This project is configured for easy deployment on Railway.

1.  **Create a Railway Account:** Sign up at [railway.app](https://railway.app/).
2.  **New Project:** Click "New Project" and select "Deploy from GitHub repo".
3.  **Select Repository:** Choose your Team Task Manager repository.
4.  **Add MongoDB:** In your Railway project, click "New" -> "Database" -> "Add MongoDB".
5.  **Environment Variables:** 
    *   Once the backend service is created, go to the "Variables" tab.
    *   Add `MONGO_URI` (you can get the internal connection string from your Railway MongoDB service).
    *   Add `JWT_SECRET`.
    *   Add `PORT` (Railway usually handles this automatically, but you can set it if needed).
6.  **Railway Configuration:** The `railway.json` file in the root directory tells Railway how to build and start both the backend and frontend services. Make sure your Railway project settings recognize it (or you can separate frontend and backend into two different Railway services).

## API Endpoints

### Auth
*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - Authenticate a user and get token

### Projects
*   `GET /api/projects` - Get projects for the logged-in user
*   `POST /api/projects` - Create a new project (Admin only)
*   `GET /api/projects/:id` - Get project details

### Tasks
*   `GET /api/tasks` - Get tasks for the logged-in user
*   `POST /api/tasks` - Create a new task (Admin only)
*   `GET /api/tasks/project/:projectId` - Get tasks for a specific project
*   `PUT /api/tasks/:id/status` - Update task status

### Users
*   `GET /api/users` - Get all users (Admin only)
