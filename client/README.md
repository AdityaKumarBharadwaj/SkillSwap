# 💻 SkillSwap - Frontend Client

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

This directory contains the **frontend user interface** for the SkillSwap platform.  
It is a **Single Page Application (SPA)** built with performance, scalability, and responsive design in mind.

---

## ⚡ Quick Start

### 1️⃣ Installation
Navigate to the `client` directory and install dependencies:

```bash
cd client
npm install
```

### 2️⃣ Run Development Server
Start the Vite development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 📂 Project Structure

A quick guide to the frontend architecture:

```
/src
│
├── /components
│   └── Navbar.jsx       # Global navigation bar
│
├── /context
│   └── AuthContext.jsx  # Handles user state (Login/Register/Logout)
│
├── /pages
│   ├── Home.jsx         # Dashboard & Skills Feed
│   ├── Login.jsx        # Authentication Forms
│   ├── Register.jsx     # User Registration
│   └── AddSkill.jsx     # Form to post new skills (Protected)
│
├── App.jsx              # Main Router Configuration
└── main.jsx             # React DOM Entry Point
```

---

## ⚙️ Configuration

### 🎨 Tailwind CSS
- Styling is handled using **Tailwind CSS utility classes**
- Config file: `vite.config.js` (via `@tailwindcss/vite`)
- CSS Entry file: `src/index.css`

### 🔌 API Connection
- Backend Base URL:  
  ```
  http://localhost:5000
  ```
- HTTP Client: **Axios**
- Authentication:
  - JWT tokens stored in `localStorage`
  - Tokens attached to headers for protected routes

---

## 📜 Available Scripts

| Command | Description |
|-------|-------------|
| `npm run dev` | Starts development server with HMR |
| `npm run build` | Builds the app for production (`dist` folder) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🎨 UI & Design System

### Icons
- **Lucide React** for consistent, lightweight vector icons

### Color Palette
- **Primary:** Indigo (`#4F46E5`)
- **Secondary:** Emerald (`#10B981`)
- **Background:** Gray-50 (`#F9FAFB`)

---

## 🔗 Parent Project
This frontend is part of the **SkillSwap** MERN Stack application  
→ See root-level README for full project details.
