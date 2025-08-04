# 🌐 PeerNet – Mini LinkedIn Community Platform

PeerNet is a full-stack social media application where users can sign up, log in, create posts, and view others’ posts. It features user authentication, profile pages, a home feed, and dynamic UI built using React and styled with custom CSS.

## 📦 Tech Stack

- **Frontend:** React + Vite, React Router, Axios
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** Passport + Cookies + Context API
- **Deployment:** 
  - Frontend: [Netlify](https://peent.netlify.app)
  - Backend: [Render](https://peernet-lwte.onrender.com)

## ✨ Features

- User registration and login (with `username`, `email`, `password`)
- Persistent sessions with `HTTP-only` cookies
- Create and view posts
- Profile page with user-specific posts
- Responsive and styled UI using modular `.css` files
- REST API with proper error handling

## 🛠️ Local Setup Instructions

### 📁 Clone the repo

```bash
git clone https://github.com/Yash-Atkari/PeerNet.git
cd peernet
```
### Backend Setup
```bash
cd backend
npm install
```
Create a .env file:
```bash
PORT=5000
ATLASDB_URL=your_mongodb_connection_string
```
Start the server:
```bash
node server.js
```
The backend will run on: `http://localhost:5000`
### Frontend Setup
```bash
cd frontend
cd peernet-project
```
Create a .env file:
```bash
VITE_API_BASE=http://localhost:5000
```
Start the frontend:
```bash
npm run dev
```
The frontend will run on: `http://localhost:5173`

Note: Currently, the deployed version of the project is facing functionality issues. While both the frontend and backend have been successfully deployed on different platforms, the application is not working as expected in the deployed environment. This may be due to configuration issues, incorrect API endpoints, or CORS-related problems. I am actively working on identifying and resolving the issue. The local version of the project works correctly.
