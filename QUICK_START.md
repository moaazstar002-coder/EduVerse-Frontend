# Quick Start Guide - EduVerse

## ⚡ Getting Up & Running in 2 Minutes

### 1. Install Dependencies
```bash
cd EduVerse
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🎯 Features to Explore

### Try These Actions:

1. **Browse Courses**
   - Visit `/courses` to see all available courses
   - Use filters to find courses by category, price, or difficulty
   - Search for specific courses

2. **View Course Details**
   - Click any course card to see full details
   - View instructor information and lessons
   - Check student reviews

3. **Register & Login**
   - Click "Register" to create a new account
   - Use test credentials: 
     - Email: test@example.com
     - Password: test123456
   - After login, you'll be redirected to dashboard

4. **Enroll in Courses**
   - Click "Enroll Now" on any course
   - Check your enrolled courses in the dashboard
   - View your learning progress

5. **Dashboard Features**
   - View your enrolled courses
   - Track learning progress
   - Update your profile
   - Manage account settings

6. **Dark Mode**
   - Click the moon icon in navbar to toggle theme
   - Settings persist during the session

## 📂 Project Structure Overview

```
EduVerse/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Full page components
│   ├── stores/           # Zustand state
│   ├── data/             # Mock data
│   ├── utils/            # Helper functions
│   ├── styles/           # Global CSS
│   └── App.jsx           # Main app component
├── public/               # Static assets
├── package.json
└── vite.config.js
```

## 🔑 Key Files to Understand

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routing setup |
| `src/pages/Home.jsx` | Landing page |
| `src/pages/Courses.jsx` | Courses listing with filters |
| `src/stores/authStore.js` | User & course state |
| `src/data/coursesData.js` | Sample course data |

## 🎨 Customization

### Change Colors
Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --primary: #4f46e5;      /* Main color */
  --secondary: #ec4899;    /* Accent color */
  --success: #10b981;      /* Success green */
  --error: #ef4444;        /* Error red */
  /* ... more colors */
}
```

### Add More Courses
Edit `src/data/coursesData.js` and add course objects to the `coursesData` array.

### Modify Navigation
Edit `src/components/Navbar.jsx` to add/remove navigation links.

## 🚀 Production Build

```bash
npm run build        # Creates optimized build
npm run preview      # Preview production build locally
```

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Module not found errors?**
```bash
rm -rf node_modules
npm install
```

**Clear cache & restart:**
```bash
npm run dev -- --force
```

## 📚 Component Architecture

### Reusable Components
- `Navbar` - Navigation with auth state
- `CourseCard` - Course listing card
- `FilterBar` - Filter UI
- `Footer` - Site footer
- `ReviewCard` - Student review display
- `HeroSection` - Landing section

### Page Components
- `Home` - Landing page
- `Courses` - Courses listing
- `CourseDetails` - Single course view
- `Login` - Authentication
- `Register` - User signup
- `Dashboard` - User profile

## 💾 Data & State

### State Management (Zustand)
```javascript
// Auth store
useAuthStore() // user, isAuthenticated, login(), logout()

// Course store  
useCourseStore() // enrolledCourses, enrollCourse()
```

### Local Storage
- User data
- Enrolled courses
- Course progress
- Theme preference

## 🎬 Next Steps

1. **Add a backend** - Create API endpoints
2. **Database** - Connect MongoDB/PostgreSQL
3. **Video player** - Integrate video hosting
4. **Payments** - Add Stripe integration
5. **Deploy** - Push to Vercel/Netlify

## 📞 Need Help?

Check the main README.md for:
- Full feature documentation
- Technology stack details
- Future enhancement ideas

---

Happy coding! 🚀
