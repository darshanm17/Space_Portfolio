# 🦾 Space Portfolio - Full Stack Developer Portfolio

An Iron Man–inspired full-stack portfolio website featuring a glowing arc reactor theme, modern UI, and real-time project data fetched from a custom backend powered by MongoDB Atlas.

<p align="center">
  <img src="./preview.png" width="800" />
</p>

---

## 🌐 Live Links

- 🚀 Frontend (Vercel): [space-portfolio.vercel.app](https://space-portfolio-8j5q.vercel.app/)
- 🛠️ Backend (Render): [space-portfolio-api.onrender.com](https://darshans-portfolio-info-backend.onrender.com)

---

## 🚀 Tech Stack

### 🔹 Frontend (client/)
- ⚛️ React with Vite
- 🎨 Tailwind CSS / Custom CSS
- 🔌 Axios (for API calls)
- 💌 EmailJS (contact form)
- 🧠 Framer Motion (animations)

### 🔸 Backend (backend/)
- 🧾 Express.js (Node.js server)
- 🛢️ MongoDB Atlas (cloud database)
- 📦 Mongoose (ODM)
- 🌍 Render.com (backend hosting)
- 🔒 dotenv for environment variables

---

## 🧠 Features

- 🖥️ Responsive portfolio sections (About, Projects, Skills, Contact)
- 🔄 Dynamic project data fetched from MongoDB
- 📧 Contact form with EmailJS integration
- 💻 GitHub/LeetCode stats (optional)
- 🔥 Iron Man arc-reactor themed UI with animations

---

## 📦 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/space-portfolio.git
cd space-portfolio
```

### 2. Setup Backend
```bash
cd backend
npm install
```
## 📄 Create .env file
```bash
MONGO_URI=your-mongodb-atlas-connection-string
PORT=5000
```
## Run the backend
```bash
npm start
# or
npx nodemon server.js
```
Your API should now be running at: http://localhost:5000

### 3. Setup Frontend

```bash
cd ../client
npm install
```

## Set backend API URL in .env
```ini
VITE_API_URL=https://space-portfolio-api.onrender.com
```

## Run the frontend
```bash
npm run dev
```
Open in browser: http://localhost:5173

🌍 Deployment Instructions
🔹 Backend on Render

    Go to Render

    Create a new Web Service

    Link your backend/ folder repo

    Set environment variables:

        MONGO_URI

        PORT=5000

    Set start command: npm start

    Deploy

🔸 Frontend on Vercel

    Go to Vercel

    Import your GitHub repo and point to client/ directory

    Add environment variable:

        VITE_API_URL=https://space-portfolio-api.onrender.com

    Deploy
### 📬 Contact

If you'd like to collaborate, connect, or just say hi:

📧 darshanmrd17@gmail.com

🔗 LinkedIn

🌐 Live Portfolio


### 💡 Inspiration

    "Sometimes you gotta run before you can walk." – Tony Stark

## This portfolio reflects my journey as a developer — futuristic, persistent, and engineered with passion.

### ⭐ Show Your Support

If you like this project:

⭐ Star this repo

🔁 Share with others

☕ Buy Me a Coffee
