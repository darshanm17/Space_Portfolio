# 🚀 Space Portfolio

<div align="center">
  <img src="https://media.giphy.com/media/3o7TKz2eMXx7dn95FS/giphy.gif" alt="Mission Impossible Animation" width="400"/>
</div>

> **A futuristic, Mission-Impossible-themed portfolio built with React, TypeScript, Node.js, and MongoDB.**

## ✨ Features

- 🛰️ **Animated Hero Section** with interactive background
- 🎬 **Mission Impossible Quiz** with video & music
- 🔒 **Password-protected Edit Mode**
- 🛠️ **Project Showcase** with tech stack tags
- 🌑 **Dark, neon-glow UI** inspired by sci-fi movies
- ⚡ **Framer Motion Animations** throughout
- 🗃️ **Fullstack:** React + Node.js + MongoDB

## 📸 Preview

<div align="center">
  <img src="https://media.giphy.com/media/3o7TKz2eMXx7dn95FS/giphy.gif" alt="Portfolio Preview" width="600"/>
</div>

## 🚦 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/space-portfolio.git
cd space-portfolio

# 2. Install dependencies
npm install
cd backend && npm install && cd ..

# 3. Start the backend (in one terminal)
cd backend
npm run dev

# 4. Start the frontend (in another terminal)
cd ..
npm run dev

# 5. Open in browser
# Visit http://localhost:5173 (or the port Vite shows)
```

## 🔧 Troubleshooting

### Port Issues

If you see errors like:
```
Error: listen EADDRINUSE: address already in use :::5000
```

Run these commands to free up ports:
```bash
# Kill all Node processes
pkill -f node

# Or find and kill specific processes
lsof -i :5000
kill -9 <PID>
```

### Frontend Port
The frontend will automatically try ports 5173-5177 if the default port is in use. Check the terminal output for the correct URL:
```
VITE v6.3.5  ready in 137 ms
➜  Local:   http://localhost:5177/
```

### Missing Components
If you see errors like:
```
Failed to resolve import "./ProjectForm" from "src/components/ProjectDetails.tsx"
```
Make sure all component files exist in the correct locations.

## 🛠️ Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Framer Motion
  - Emotion
  - Vite
  - Axios

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Multer (for file uploads)

- **Media:**
  - Custom video & audio
  - Animated backgrounds
  - Mission Impossible theme

## 🧑‍💻 Folder Structure

```
space-portfolio/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   └── index.js     # Server entry
│   └── uploads/         # Uploaded files
├── public/              # Static assets
│   ├── mission-impossible-bg.mp4
│   ├── mission-impossible-theme.mp3
│   └── profile.jpeg
├── src/                 # React frontend
│   ├── components/      # React components
│   ├── assets/         # Frontend assets
│   └── App.tsx         # Main component
└── package.json         # Project metadata
```

## 🔐 Mission Impossible Quiz

<div align="center">
  <img src="https://media.giphy.com/media/3o7TKz2eMXx7dn95FS/giphy.gif" alt="Mission Impossible Theme" width="300"/>
</div>

To edit a project, you must:
1. Pass the Mission Impossible quiz (with video/music)
2. Enter the secret password: `DM171819`

## 🌌 Credits

- [Framer Motion](https://www.framer.com/motion/)
- [Emotion](https://emotion.sh/docs/introduction)
- [SoundHelix](https://www.soundhelix.com/) (for theme music)
- [Mixkit](https://mixkit.co/) (for background video)
- [Animated GIFs](https://giphy.com/)

## 🪐 License

MIT

---

<div align="center">
  <img src="https://media.giphy.com/media/3o7TKz2eMXx7dn95FS/giphy.gif" alt="Mission Impossible Animation" width="200"/>
  <br/>
  <em>"Your mission, should you choose to accept it, is to fork this repo and make it your own!"</em>
</div>

---

**Tip:**  
You can add your own animated GIFs or screen recordings to the `public/` folder and update the links above for a more personalized touch!
