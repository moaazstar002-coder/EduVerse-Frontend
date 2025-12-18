# 📚 EduVerse - Online Learning Platform

A modern, fully-featured online learning platform built with React and cutting-edge web technologies.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd EduVerse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📦 Project Structure

```
EduVerse/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── CourseCard.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Footer.jsx
│   │   ├── FilterBar.jsx
│   │   ├── ReviewCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── stores/              # State management (Zustand)
│   │   └── authStore.js
│   ├── data/                # Static data
│   │   └── coursesData.js
│   ├── utils/               # Utility functions
│   │   └── helpers.js
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

## 🎨 Key Features

### 1. Home Page
- Hero section with call-to-action
- Featured categories showcase
- Top-rated courses carousel
- Student testimonials
- Call-to-action section

### 2. Courses Page
- Advanced filtering (category, difficulty, price)
- Search functionality
- Responsive course grid
- Filter management

### 3. Course Details Page
- Complete course information
- Instructor details
- Lesson list with progress tracking
- Student reviews
- Enroll button

### 4. Authentication System
- User registration
- User login
- Protected routes
- Form validation

### 5. User Dashboard
- My Courses tab (enrolled courses with progress)
- Progress tab (detailed learning statistics)
- Settings tab (profile management)
- Logout functionality

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Routing
- **Zustand** - State management
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Styling
- **CSS3** - Custom styling
- **CSS Variables** - Theme system
- **Responsive Design** - Mobile-first approach

### Development
- **Vite** - Build tool
- **ESLint** - Code linting

## 🎯 Key Pages & Routes

| Route | Component | Auth Required | Description |
|-------|-----------|---------------|-------------|
| `/` | Home | No | Landing page |
| `/courses` | Courses | No | All available courses |
| `/course/:id` | CourseDetails | No | Individual course details |
| `/login` | Login | No | User login |
| `/register` | Register | No | User registration |
| `/dashboard` | Dashboard | Yes | User dashboard & profile |

## 🔐 Authentication

The app uses local storage to manage authentication state. Features include:
- User registration and login
- Protected routes (dashboard requires login)
- Persistent user sessions
- Logout functionality

## 🎨 Theming

The app supports light and dark themes with:
- CSS custom properties for easy theme switching
- Smooth transitions between themes
- Consistent color palette across all pages

### Color Variables
- Primary: `#4f46e5` (Indigo)
- Secondary: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)

## 💾 Data Management

### Local Storage
- User authentication data
- Enrolled courses list
- Course progress tracking
- User profile information

### Sample Data
Course data is available in `src/data/coursesData.js` with:
- 8 sample courses
- 5 course categories
- 3 sample testimonials

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🚀 Build & Deployment

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

### Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔮 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Video player implementation
- [ ] Certificate generation
- [ ] Advanced progress tracking
- [ ] Real-time notifications
- [ ] Payment integration (Stripe)
- [ ] Instructor panel
- [ ] Discussion forums
- [ ] Multi-language support





Built with ❤️ using React & Vite
