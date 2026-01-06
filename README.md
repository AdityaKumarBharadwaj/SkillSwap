<p align="center">
  <img src="client/src/assets/logo.png" width="110" alt="SkillSwap Logo">
</p>

# <img src="client/src/assets/logo.png" alt="SkillSwap Logo" width="55" style="vertical-align: middle; margin-right: 10px;"> SkillSwap - Neighborhood Skill Exchange Platform


![MERN Stack](https://img.shields.io/badge/MERN-Stack-000000?style=for-the-badge&logo=react&logoColor=61DAFB)
![Status](https://img.shields.io/badge/Status-Active_Development-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

> **"Time is the new currency."**

SkillSwap is a community-driven web platform where neighbors exchange skills (tutoring, repairs, tech support) using **Time Credits** instead of money. If you give 1 hour of help, you earn 1 Time Credit to receive help later.

---

## 🌟 Key Features

### 🔐 Authentication & Security
- **Secure Registration/Login:** Powered by JWT (JSON Web Tokens) and Bcrypt hashing  
- **Protected Routes:** Only authenticated users can access specific features  
- **Session Persistence:** Automatic login via LocalStorage  

### 📋 Skill Management
- **Post a Skill:** Offer services (Title, Description, Category, Location)  
- **Smart Dashboard:** View Time Credits, Location, and Reputation stats  
- **Ownership Control:** Users can delete only their own listings  
- **Dynamic Feed:** Real-time fetching of community skills  

### 🎨 User Interface
- **Modern Design:** Built with **Tailwind CSS**  
- **Visual Feedback:** Loading states, error handling, toast notifications  
- **Iconography:** Beautiful icons via Lucide-React  

---

## 🏗️ Architecture

### High-Level Overview
```mermaid
graph TD
  Client[React Frontend] <-->|JSON + JWT| API[Express API]
  API <-->|Mongoose ODM| DB[(MongoDB)]
```

### Detailed System Diagram
```mermaid
graph TD
    %% --- STYLING ---
    classDef client fill:#e0f2fe,stroke:#0284c7,stroke-width:2px;
    classDef server fill:#fce7f3,stroke:#db2777,stroke-width:2px;
    classDef db fill:#dcfce7,stroke:#16a34a,stroke-width:2px;
    classDef actor fill:#f3f4f6,stroke:#374151,stroke-width:1px;

    %% --- ACTORS ---
    User((User)):::actor

    %% --- FRONTEND CLIENT ---
    subgraph "FRONTEND (React + Vite)"
        direction TB
        App[App.jsx / Router]:::client
        
        subgraph "State Management"
            Context[AuthContext.jsx]:::client
            TokenStore[LocalStorage]:::client
        end
        
        subgraph "Pages"
            P_Home[Home.jsx]:::client
            P_Add[AddSkill.jsx]:::client
            P_Auth[Login/Register.jsx]:::client
        end
        
        Axios[Axios Interceptor]:::client
    end

    %% --- BACKEND SERVER ---
    subgraph "BACKEND (Node.js + Express)"
        direction TB
        Server[server.js / app.js]:::server
        
        subgraph "Security Layer"
            CORS[CORS Policy]:::server
            AuthMid[Auth Middleware 'protect']:::server
        end
        
        subgraph "API Routes"
            R_Auth[/api/auth/]:::server
            R_Skill[/api/skills/]:::server
        end
        
        subgraph "Controllers"
            C_Auth[authController.js]:::server
            C_Skill[skillController.js]:::server
        end
    end

    %% --- DATABASE ---
    subgraph "DATABASE (MongoDB)"
        direction TB
        DB_User[(Users Collection)]:::db
        DB_Skill[(Skills Collection)]:::db
    end

    %% --- FLOW CONNECTIONS ---
    User -->|Clicks Login| P_Auth
    User -->|Views Feed| P_Home
    User -->|Posts Skill| P_Add

    P_Auth -->|1. Login Request| Context
    Context -->|2. Saves Token| TokenStore
    P_Add -->|3. Get Token| Context
    Context -->|4. Attach Bearer Token| Axios
    
    Axios -->|HTTP POST /api/auth| R_Auth
    Axios -->|HTTP GET /api/skills| R_Skill
    Axios -->|HTTP POST /api/skills| R_Skill

    R_Auth --> C_Auth
    R_Skill -->|Public Request| C_Skill
    R_Skill -->|Protected Request| AuthMid
    
    AuthMid -->|Verify JWT| C_Skill
    AuthMid -.->|Invalid Token| Server

    C_Auth <-->|Read/Write User| DB_User
    C_Skill <-->|Create/Delete Skill| DB_Skill
    
    DB_Skill -.->|Ref: UserID| DB_User
```

---

## 📂 Folder Structure
```
/skill-exchange-platform
│
├── /client          # Frontend (React + Vite + Tailwind)
│   └── /src
│       ├── /components   # Reusable UI
│       ├── /context      # AuthContext (Global State)
│       └── /pages        # Views (Home, Login, AddSkill)
│
└── /server          # Backend (Node + Express)
    ├── /config      # DB Connection
    ├── /controllers # Business Logic
    ├── /middleware  # Auth Protection
    ├── /models      # Mongoose Schemas
    └── /routes      # API Endpoints
```

---

## 🚀 Tech Stack

### Frontend
- React (Vite)  
- Tailwind CSS  
- Axios  
- React Router DOM  
- Lucide Icons  

### Backend
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT & Bcrypt  
- CORS  

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14+)  
- MongoDB (Local or Atlas)  
- Git  

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/skill-exchange.git
cd skill-exchange
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/skill-exchange
JWT_SECRET=your_super_secret_key_123
```

Run the backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Access |
|-------|----------|-------------|--------|
| POST | /api/auth/register | Register a new user | Public |
| POST | /api/auth/login | Login user & get token | Public |
| GET | /api/skills | Get all skills | Public |
| POST | /api/skills | Create new skill | Private |
| DELETE | /api/skills/:id | Delete skill | Private (Owner) |

---

## 🤝 Open for Collaboration
We welcome contributions — help us add new features!

---

## 💡 How to Contribute
1. Fork the repo  
2. Create a branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit:
   ```bash
   git commit -m "Add AmazingFeature"
   ```
4. Push & open a Pull Request  

---

## 📜 License
Distributed under the MIT License.

---

## 📬 Contact
**Project Maintainer:** Aditya Kumar  
**Email:** kumarsinghaditya240@gmail.com
