⭐ Rating App

A full-stack web app where users can explore stores and leave ratings.
Access and actions are role-based (Admin, Owner, User).

Built with React (Vite + Tailwind CSS) and Node.js + Express + MySQL.

🚀 Features

JWT authentication (login/signup), secure protected routes

Three roles:

Admin – dashboard totals, manage users & stores

Owner – see who rated their store(s) + average rating

User – browse/search stores, add/update/delete ratings

Store lists with sorting & filtering

Passwords hashed with bcrypt

Responsive UI

🛠 Tech Stack

Frontend: React (Vite), Tailwind CSS, React Router, Axios
Backend: Node.js, Express, Sequelize, JWT, bcrypt
Database: MySQL

⚡ Quick Start
Prerequisites

Node.js (v18+ recommended)

MySQL running locally

Create a database (e.g. ratingapp)

Backend
cd backend
npm install


Create .env in backend/:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=rating_app
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173


Run the server:

npm run dev

Frontend
cd frontend
npm install
npm run dev


Open: http://localhost:5173

🧪 Test Accounts

You can create users via signup/login or seed manually.
Typical roles: ADMIN, OWNER, USER.

📝 Notes

Ensure CORS_ORIGIN matches your frontend URL (http://localhost:5173 for Vite).

If you change ports, update .env accordingly.

Sequelize will sync models on start (dev mode).
