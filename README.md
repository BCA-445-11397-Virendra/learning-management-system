# 📚 Learning Management System (LMS)

## 📌 Project Overview

The **Learning Management System (LMS)** is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It provides a complete online learning platform where students can enroll in courses, attend live classes, watch recorded lectures, and track their progress.

Admins can efficiently manage users, courses, and content through a secure dashboard.

---

## 🚀 Features

### 👨‍🎓 Student Features

* User Registration & Login (JWT Authentication)
* Browse and enroll in courses
* Watch video lectures
* Access course materials
* Track learning progress
* View and update profile

### 🧑‍🏫 Admin Features

* Admin dashboard
* Create, update, and delete courses
* Manage students and instructors
* Upload course content (videos, PDFs)
* Monitor enrollments
* Manage payments (if integrated)

### 📺 Learning Features

* Course-based learning system
* Video streaming support
* Live classes module (optional)
* Assignment and quiz system (optional)

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* HTML5, CSS3, JavaScript,sadsan ui
* Axios (RTK QUERY)
* React Router

### Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication:
* Rate Limiting
* JSON Web Token (JWT)
* Bcrypt.js

---

## 📂 Project Structure

```
LMS-Project/
│
├── frontend/        # React frontend
│   ├── src/
│   ├── components/
│   └── pages/
│
├── backend/         # Node + Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/lms-mern-platform.git
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUD_NAME= cloudanily name
API_KEY = cloudnaly api
API_SECRET = cloudnaly secret ky
## stripe stup
STRIPE_SECRET_KEY = asdfasdfasdffasdfa
STRIPE_PUBLISHABLE_KEY = asdfasdfasd

WEBHOOK_ENDPOINT_SECRET = wshl-asdfasdfasdsdfasdfa
```

---

## 📈 Future Improvements

* Live video classes integration
* AI-based course recommendations
* Mobile app version
* Certificate generation system

---
## 👨‍💻 Developer

**Virendra Kumar** <br/>
   BCA Final Year Student <br/>
   Course: BCA-3rd Year <br/>
   College id : 445-11397 <br/>
   College Name : Cimage College Patna <br/>
   Full Stack MERN Developer (Learning Phase)

---

## 📜 License

This project is for educational purposes only.
