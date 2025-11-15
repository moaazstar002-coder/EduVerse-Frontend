# Backend Setup Guide

This guide helps you add a Node.js/Express backend to EduVerse.

## 🏗️ Architecture Overview

```
EduVerse (Current - Frontend)
    ↓
    ↓ API Calls (Axios)
    ↓
EduVerse Backend (Node.js/Express)
    ↓
    ↓ Database (MongoDB)
    ↓
MongoDB Database
```

## 📋 Prerequisites

- Node.js installed
- MongoDB (local or Atlas)
- Postman (for API testing)
- Basic Express.js knowledge

## 🚀 Step 1: Create Backend Project

```bash
# Create a new directory for backend
mkdir EduVerse-backend
cd EduVerse-backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express cors mongodb dotenv bcryptjs jsonwebtoken axios
npm install --save-dev nodemon
```

## 📝 Step 2: Basic Server Setup

Create `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Create `.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 🗄️ Step 3: Database Connection

Create `config/db.js`:

```javascript
const { MongoClient } = require('mongodb');

let db = null;

async function connectDB() {
  if (db) return db;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  db = client.db('eduverse');
  
  console.log('Connected to MongoDB');
  return db;
}

module.exports = { connectDB };
```

## 👤 Step 4: Authentication Routes

Create `routes/auth.js`:

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save to DB
    const db = require('../config/db').connectDB();
    const result = await (await db).collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    
    res.json({ id: result.insertedId, email, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const db = require('../config/db').connectDB();
    const user = await (await db).collection('users').findOne({ email });
    
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid password' });
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## 📚 Step 5: Course Routes

Create `routes/courses.js`:

```javascript
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const db = require('../config/db').connectDB();
    const courses = await (await db).collection('courses').find().toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const db = require('../config/db').connectDB();
    const course = await (await db).collection('courses').findOne({
      _id: new ObjectId(req.params.id)
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create course (admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, instructor } = req.body;
    
    const db = require('../config/db').connectDB();
    const result = await (await db).collection('courses').insertOne({
      title,
      description,
      price,
      thumbnail,
      instructor,
      createdAt: new Date(),
    });
    
    res.json({ id: result.insertedId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## 🔗 Step 6: Connect Frontend

Update `src/utils/api.js` in your React app:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getCourses = () => API.get('/courses');
export const getCourse = (id) => API.get(`/courses/${id}`);

export default API;
```

Update `src/pages/Login.jsx` to use the API:

```javascript
import { login } from '../utils/api';

const onSubmit = async (data) => {
  try {
    const response = await login(data);
    useAuthStore.getState().login(response.data.user);
    navigate('/dashboard');
  } catch (error) {
    toast.error(error.response?.data?.error || 'Login failed');
  }
};
```

## 📦 Step 7: Package.json Scripts

Update `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build needed for server'"
  }
}
```

## 🚀 Step 8: Run Everything

Terminal 1 (Backend):
```bash
cd EduVerse-backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd EduVerse
npm run dev
```

## 📊 Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "createdAt": Date
}
```

### Courses Collection
```json
{
  "_id": ObjectId,
  "title": "React Basics",
  "description": "Learn React",
  "price": 49.99,
  "thumbnail": "url",
  "instructor": "John Instructor",
  "category": "Web Development",
  "createdAt": Date
}
```

### Enrollments Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "courseId": ObjectId,
  "progress": 50,
  "enrolledAt": Date
}
```

## 🔐 Middleware for Authentication

Create `middleware/auth.js`:

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

## 🔍 Testing API Endpoints

Use Postman or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get courses
curl http://localhost:5000/api/courses
```

## 📝 Next Steps

1. Implement enrollment endpoints
2. Add progress tracking
3. Create review endpoints
4. Add payment integration
5. Implement file upload for course thumbnails
6. Add caching with Redis

## 🚀 Deployment

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Update Frontend API URL

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

For more details, refer to:
- Express.js documentation: https://expressjs.com
- MongoDB documentation: https://docs.mongodb.com
- JWT Guide: https://jwt.io

Happy coding! 🚀
