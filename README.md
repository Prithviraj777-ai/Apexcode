# 🚀 ApexCode - Full Stack LeetCode-Style Coding Platform

A modern full-stack coding interview preparation platform inspired by LeetCode. ApexCode allows users to solve coding problems, run code against test cases, track progress, learn through video content, and get AI-powered coding assistance.

---

# 🌟 Features

## 👨‍💻 User Features

- Secure User Authentication
- Solve Coding Problems
- Run Code Instantly
- Submit Solutions
- View Submission History
- Track Learning Progress
- AI Coding Assistant
- Watch Educational Videos
- User Dashboard
- Profile Management

## 🛡️ Admin Features

- Create Coding Problems
- Update Existing Problems
- Delete Problems
- Upload Learning Videos
- Manage Test Cases
- Monitor User Activity
- Manage Platform Content

---

# 🏗️ System Architecture

```text
Frontend (React + Vite)
        │
        ▼
Backend API (Node.js + Express)
        │
 ┌──────┼─────────┐
 ▼      ▼         ▼
MongoDB Redis   Judge0
 │       │         │
 ▼       ▼         ▼
Data   Cache   Code Execution
```

---

# 💻 Tech Stack

## Frontend

### React.js
Used for building dynamic and reusable UI components.

### Vite
Fast frontend build tool with lightning-fast hot module replacement.

### React Router
Handles client-side routing between pages.

### Redux Toolkit
Manages global application state.

### React Query (TanStack Query)
Used for:
- API caching
- Data synchronization
- Background refetching
- Reduced API requests

### Axios
Handles communication between frontend and backend APIs.

### Monaco Editor
Provides the coding editor experience.

Features:
- Syntax Highlighting
- Auto Completion
- Multiple Language Support
- Same editor used in VS Code

### Tailwind CSS
Utility-first CSS framework for fast and responsive UI development.

### ShadCN UI

Used for modern and professional UI components.

Components include:
- Buttons
- Cards
- Dialogs
- Inputs
- Selects
- Tabs
- Badges

Why ShadCN?

✅ Fully customizable

✅ Built on Radix UI

✅ Excellent accessibility

✅ Production-ready design

✅ Better developer experience

### DaisyUI
Additional Tailwind component library for themes and rapid UI development.

### Framer Motion
Provides animations and page transitions.

### Lucide React
Modern icon library.

### Recharts
Used for dashboards and progress analytics.

### React Hook Form
Efficient form handling and validation.

### Zod
Schema validation for frontend forms and API data.

---

# ⚙️ Backend

## Node.js
JavaScript runtime used to power backend services.

## Express.js
Backend framework for building REST APIs.

Routes include:

```text
/api/auth
/api/problem
/api/submission
/api/video
/api/ai
/api/admin
```

---

## MongoDB

Primary database storing:

- Users
- Problems
- Test Cases
- Submissions
- Videos
- Progress Data

---

## Mongoose

MongoDB ODM used for:

- Schema Validation
- Query Management
- Data Modeling

---

## JWT Authentication

Authentication flow:

```text
Login
  ↓
JWT Generated
  ↓
Cookie Stored
  ↓
Protected Routes
```

Provides secure authentication without server-side sessions.

---

## Bcrypt

Used to hash user passwords before storing them in MongoDB.

Benefits:

- Prevents password leaks
- Industry standard security

---

## Cookie Parser

Reads authentication cookies from incoming requests.

---

## Helmet

Adds security headers to protect against:

- XSS Attacks
- Clickjacking
- MIME Sniffing

---

## CORS

Enables secure communication between frontend and backend applications.

---

# 🚀 Why Redis Is Used

Redis is an in-memory data store that provides extremely fast access times.

### 1. JWT Token Blacklisting

When a user logs out:

```text
JWT Token
    ↓
Stored in Redis
    ↓
Token Becomes Invalid
```

Since JWT is stateless, Redis helps invalidate tokens immediately.

---

### 2. Fast Authentication Checks

Instead of querying MongoDB repeatedly:

```text
MongoDB → Slower
Redis   → Extremely Fast
```

Redis works entirely in memory and typically responds within milliseconds.

---

### 3. Caching Layer

Can be used to cache:

- User Profiles
- Coding Problems
- Leaderboards
- Frequently Accessed Data

Benefits:

- Faster API responses
- Reduced database load
- Improved scalability

---

### 4. Memory Cache Fallback

The project includes a memory cache fallback mechanism.

Flow:

```text
Redis Available
       ↓
Use Redis

Redis Down
       ↓
Use Memory Cache
```

This improves reliability during development and deployment.

---

# ⚡ Judge0 Integration

Judge0 powers the online code execution engine.

### Supported Languages

- C++
- Java
- Python
- JavaScript
- More Languages via Judge0

Execution Flow:

```text
User Writes Code
        ↓
Frontend
        ↓
Backend
        ↓
Judge0 API
        ↓
Compilation
        ↓
Execution
        ↓
Result Returned
```

---

# 🧠 Hidden Test Cases

Supports:

```text
Visible Test Cases
Hidden Test Cases
```

Just like LeetCode.

Benefits:

- Prevents hardcoding answers
- Ensures solution correctness

---

# 🧩 Wrapper Code Generation

The platform dynamically generates wrapper code to:

- Validate user functions
- Execute test cases
- Compare outputs
- Standardize submissions

This makes problem evaluation more reliable and secure.

---

# 🤖 AI Integration

Powered using Google Generative AI.

Features:

- Coding Hints
- Problem Explanations
- Code Debugging
- Concept Clarification
- Learning Assistance

---

# ☁️ Cloudinary Integration

Used for:

- Video Uploads
- Image Uploads
- Media Storage

Benefits:

- CDN Delivery
- Image Optimization
- Scalable Storage

---

# 🔒 Security Features

### Authentication
- JWT Authentication
- Secure Cookies

### Password Security
- Bcrypt Password Hashing

### API Protection
- Helmet
- CORS

### Validation
- Zod
- Input Validation

### Authorization
- Role-Based Access Control

Roles:

```text
Admin
User
```

Admins have access to platform management features.

---

# 📂 Project Structure

```text
ApexCode
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   ├── hooks
│   ├── redux
│   ├── services
│   └── utils
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   ├── services
│   └── utils
│
└── README.md
```

---

# 📈 Scalability Considerations

Current architecture supports:

- Horizontal scaling
- Redis caching
- Stateless authentication
- Cloud media storage
- External code execution service

Future improvements:

- Docker
- Kubernetes
- CI/CD Pipeline
- Leaderboards
- Contest Mode
- Discussion Forums
- Problem Tagging
- Email Verification
- Refresh Tokens
- Rate Limiting

---

# 🚀 Deployment Stack

### Frontend
- Vercel

### Backend
- Render
- Railway
- AWS EC2

### Database
- MongoDB Atlas

### Cache
- Redis Cloud

### Media Storage
- Cloudinary

### Code Execution
- Judge0

---

# 🎯 Why This Project Stands Out

This project combines several real-world technologies used in production systems:

- Modern React Architecture
- Secure Authentication
- Redis Caching
- MongoDB Database Design
- Judge0 Code Execution Engine
- AI Integration
- Cloud Media Management
- Admin Dashboard
- Online Coding Platform Features

It demonstrates full-stack development, system design, API development, security practices, caching strategies, cloud integration, and scalable architecture in a single project.

---

# 👨‍💻 Author

**Prithviraj Chauhan**

ApexCode is a full-stack coding interview preparation platform built using modern web technologies to provide a LeetCode-like learning and problem-solving experience.

### Core Technologies

- React.js
- Vite
- Tailwind CSS
- ShadCN UI
- Redux Toolkit
- React Query
- Node.js
- Express.js
- MongoDB
- Redis
- JWT Authentication
- Judge0
- Cloudinary
- Google Generative AI

---