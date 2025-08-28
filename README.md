⭐ Rating App

A role-based rating system where Admins manage, Owners track feedback, and Users rate stores seamlessly.


🚀 Features:

    🔐 Authentication & Security
    
    JWT authentication (login/signup)
    
    Secure protected routes
    
    Passwords hashed with bcrypt

👥 Role Management:

    Access and actions are role-based (Admin, Owner, User)
    
    Role	Features
    Admin	Dashboard totals, manage users & stores
    Owner	View ratings & averages for their store(s)
    User	Browse/search stores, add/update/delete ratings

📊 Store Features:

    Store list with sorting & filtering
    
    Owners see who rated their stores

📱 UI/UX:

    Responsive design with Tailwind CSS

🛠 Tech Stack:

    Frontend: React (Vite), Tailwind CSS, React Router, Axios
    
    Backend: Node.js, Express, Sequelize, JWT, bcrypt

    Database: MySQL

⚡ Quick Start:
    🔧 Prerequisites
    
    Node.js (v18+ recommended)
    
    MySQL running locally
    
    Create a database (e.g. rating_app)


Create .env file:

    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=rating_app
    JWT_SECRET=your_secret_key
    CORS_ORIGIN=http://localhost:5173


Navigate to backend folder:

    cd backend
    npm install
    npm run dev
    
    Open in browser: http://localhost:3000

Navigate to frontend folder:

    cd frontend
    npm install
    npm run dev
    
    Open in browser: http://localhost:5173

🧪 Test Accounts:

    For quick testing, create users via signup/login or seed manually.
    
    Example accounts (if seeded):
    
    Admin: admin@demo.com / admin123
    
    Owner: owner@demo.com / owner123
    
    User: user@demo.com / user123

📝 Notes:

    Ensure CORS_ORIGIN matches your frontend URL.
    
    If you change ports, update .env accordingly.
    
    Sequelize auto-syncs models on start (dev mode).

📸 Screenshots

Login Page
<img width="1920" height="1080" src="https://github.com/user-attachments/assets/51ba83ec-657f-4f36-af30-d42f1f16cfbe" />

Signup Page
<img width="1920" height="1080" src="https://github.com/user-attachments/assets/566d1316-81ac-4473-8b75-91202058e175" />

Admin Page
<img width="1920" height="1080" src="https://github.com/user-attachments/assets/2ad7f31d-8498-40c6-8b12-fc5426d56ea3" />

Store Owner Page
<img width="1920" height="1080" src="https://github.com/user-attachments/assets/1a05e9b4-d0db-4d08-8c47-752d71015230" />

User Page
<img width="1920" height="1080" src="https://github.com/user-attachments/assets/4d89515d-5f0a-403b-975e-e6edf4030814" />
