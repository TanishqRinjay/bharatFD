# BharatFD 🌐

## Demo: https://tinyurl.com/BharatFD-Demo

A multilingual FAQ management system with admin controls and public access portal. Built with MERN stack (MongoDB, Express, React, Node.js) and Redis caching.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running the App](#running-the-app)
-   [API Documentation](#api-documentation)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

## Features ✨

-   Multilingual FAQs (English, Hindi, Bengali)
-   Admin dashboard with CRUD operations
-   JWT authentication & role-based access
-   Redis caching for improved performance
-   WYSIWYG editor for FAQ answers
-   Responsive UI with Tailwind CSS

## Tech Stack 🛠️

**Frontend:**  
React | Redux Toolkit | Tailwind CSS | React Quill

**Backend:**  
Node.js | Express | MongoDB | Redis | JWT

**DevOps:**  
Docker | Vercel | Render.com | GitHub Actions

## Installation 📦

### Prerequisites

-   Node.js v18+
-   MongoDB Atlas account
-   Redis Cloud account
-   Git

### Backend Setup

```bash
git clone https://github.com/tanishqrinjay/bharatfd.git
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## Configuration ⚙️

### Backend Environment Variables

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/faq_db
REDIS_URL=redis://<user>:<pass>@redis-host:port
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
PORT=5000
```

### Frontend Environment Variables

```env
REACT_APP_BASE_URL=http://localhost:5000
```

## Running the App 🚀

**Development Mode:**

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

**Production Mode:**

```bash
# Backend
npm start

# Frontend
npm run build && npm run preview
```

## API Documentation 📚

### Base URL

`http://localhost:5000/api`

### Endpoints

| Method | Endpoint      | Description          | Auth Required |
| ------ | ------------- | -------------------- | ------------- |
| POST   | /auth/signup  | User registration    | No            |
| POST   | /auth/signin  | User login           | No            |
| GET    | /faqs?lang=hi | Get FAQs by language | No            |
| POST   | /faqs         | Create new FAQ       | Admin         |
| PATCH  | /faqs/:id     | Update FAQ           | Admin         |
| DELETE | /faqs/:id     | Delete FAQ           | Admin         |

**Sample Request:**

```bash
curl -X POST http://localhost:5000/api/faqs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question_en": "How to reset password?",
    "answer_en": "Use the forgot password link"
  }'
```

## Deployment 🚀

**Frontend (Vercel):**

1. Push code to GitHub
2. Import repo in Vercel
3. Set build command: `npm run build`
4. Add environment variables

**Backend (Render.com):**

1. Create new Web Service
2. Connect GitHub repo
3. Use Docker deployment
4. Add environment variables

## Contributing 🤝

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Code Style:**

-   Follow ESLint rules
-   Prettier formatting
-   Atomic commits

## License 📄

Distributed under the MIT License. See `LICENSE` for more information.
