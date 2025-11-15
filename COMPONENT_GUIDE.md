# Component Guide - EduVerse

Detailed guide to all components and their usage.

---

## 📦 Components

### 1. Navbar Component
**File**: `src/components/Navbar.jsx`

**Purpose**: Main navigation bar with authentication state

**Features**:
- Logo and branding
- Navigation links
- Auth state display
- Dark mode toggle
- Mobile responsive menu
- User profile menu

**Props**: None (uses Zustand store)

**Example Usage**:
```jsx
import Navbar from './components/Navbar';

<Navbar />
```

**State Used**:
- `useAuthStore()` - User authentication state

**Styling**: `Navbar.css` (240 lines)

---

### 2. CourseCard Component
**File**: `src/components/CourseCard.jsx`

**Purpose**: Display individual course in a card format

**Props**:
```javascript
{
  course: {
    id: number,
    title: string,
    instructor: string,
    instructorImage: string,
    category: string,
    duration: string,
    price: number,
    rating: number,
    reviews: number,
    thumbnail: string,
    description: string
  }
}
```

**Example Usage**:
```jsx
import CourseCard from './components/CourseCard';
import { coursesData } from './data/coursesData';

<CourseCard course={coursesData[0]} />
```

**Features**:
- Course thumbnail with overlay
- Category badge
- Instructor info with avatar
- Course description
- Duration and student count
- Star rating
- Price display
- Hover animations

**Styling**: `CourseCard.css` (220 lines)

---

### 3. HeroSection Component
**File**: `src/components/HeroSection.jsx`

**Purpose**: Landing page hero section

**Props**: None

**Example Usage**:
```jsx
import HeroSection from './components/HeroSection';

<HeroSection />
```

**Features**:
- Animated headline with gradient
- Subheading text
- Call-to-action buttons
- Statistics showcase
- Floating card animations

**Uses**: Framer Motion animations

**Styling**: `HeroSection.css` (250 lines)

---

### 4. Footer Component
**File**: `src/components/Footer.jsx`

**Purpose**: Site footer with links and contact info

**Props**: None

**Example Usage**:
```jsx
import Footer from './components/Footer';

<Footer />
```

**Features**:
- Company info section
- Quick links
- Category shortcuts
- Contact information
- Social media links
- Legal links
- Copyright notice

**Styling**: `Footer.css` (200 lines)

---

### 5. FilterBar Component
**File**: `src/components/FilterBar.jsx`

**Purpose**: Course filtering interface

**Props**:
```javascript
{
  searchTerm: string,
  setSearchTerm: function,
  selectedCategory: string,
  setSelectedCategory: function,
  selectedDifficulty: string,
  setSelectedDifficulty: function,
  priceRange: string,
  setPriceRange: function,
  categories: array
}
```

**Example Usage**:
```jsx
import FilterBar from './components/FilterBar';

<FilterBar
  searchTerm={search}
  setSearchTerm={setSearch}
  selectedCategory={category}
  setSelectedCategory={setCategory}
  selectedDifficulty={difficulty}
  setSelectedDifficulty={setDifficulty}
  priceRange={price}
  setPriceRange={setPrice}
  categories={categories}
/>
```

**Features**:
- Search bar with icon
- Category dropdown
- Difficulty level filter
- Price range filter
- Real-time filtering

**Styling**: `FilterBar.css` (140 lines)

---

### 6. ReviewCard Component
**File**: `src/components/ReviewCard.jsx`

**Purpose**: Display student reviews/testimonials

**Props**:
```javascript
{
  review: {
    id: number,
    name: string,
    role: string,
    image: string,
    content: string,
    rating: number,
    date: string
  }
}
```

**Example Usage**:
```jsx
import ReviewCard from './components/ReviewCard';

<ReviewCard review={testimonial} />
```

**Features**:
- User avatar
- User name and role
- Star rating display
- Review content
- Timestamp
- Hover effects

**Styling**: `ReviewCard.css` (90 lines)

---

### 7. ProtectedRoute Component
**File**: `src/components/ProtectedRoute.jsx`

**Purpose**: Route guard for authenticated users

**Props**:
```javascript
{
  children: ReactNode
}
```

**Example Usage**:
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Features**:
- Checks authentication state
- Redirects to login if not authenticated
- Allows access if authenticated

**Returns**: 
- `Navigate` to `/login` if not authenticated
- `children` if authenticated

---

## 📄 Page Components

### 1. Home Page
**File**: `src/pages/Home.jsx`

**Purpose**: Landing page

**Features**:
- Hero section
- Category showcase with animations
- Top rated courses
- Testimonials section
- CTA section

**Uses**: Multiple sub-components and animations

**Styling**: `Home.css` (250 lines)

---

### 2. Courses Page
**File**: `src/pages/Courses.jsx`

**Purpose**: Courses listing with advanced filters

**Features**:
- Filter bar
- Search functionality
- Course grid
- Clear filters button
- Empty state handling

**Uses**: Zustand, React Router

**Styling**: `Courses.css` (180 lines)

---

### 3. CourseDetails Page
**File**: `src/pages/CourseDetails.jsx`

**Purpose**: Single course detailed view

**Features**:
- Course banner
- Course metadata
- Instructor info
- Lesson list
- Reviews section
- Review submission form
- Enroll button
- Sidebar with pricing

**Uses**: Zustand, Framer Motion, React Router

**Styling**: `CourseDetails.css` (420 lines)

---

### 4. Login Page
**File**: `src/pages/Login.jsx`

**Purpose**: User authentication

**Features**:
- Email input
- Password input with toggle
- Form validation
- Error messages
- Loading state
- Link to register

**Uses**: React Hook Form, Zustand, React Router

**Styling**: `Auth.css` (280 lines)

---

### 5. Register Page
**File**: `src/pages/Register.jsx`

**Purpose**: User account creation

**Features**:
- Full name input
- Email input
- Password input with toggle
- Confirm password input
- Form validation
- Password matching validation
- Error messages
- Loading state
- Link to login

**Uses**: React Hook Form, Zustand, React Router

---

### 6. Dashboard Page
**File**: `src/pages/Dashboard.jsx`

**Purpose**: User account management

**Features**:
- **Sidebar Navigation**:
  - User profile card
  - Tab navigation
  - Logout button

- **My Courses Tab**:
  - Enrolled courses grid
  - Progress bars
  - Continue learning buttons
  - Empty state

- **Progress Tab**:
  - Progress cards
  - Statistics
  - Detailed breakdown

- **Settings Tab**:
  - Profile editing
  - Account information
  - Account deletion option

**Uses**: Zustand, Framer Motion, React Router

**Styling**: `Dashboard.css` (550 lines)

---

## 🎣 Custom Hooks

### Available for Implementation
- `useLocalStorage()` - localStorage management
- `useDebounce()` - Debounce search input
- `useFetch()` - API data fetching
- `useTheme()` - Theme management

**Location**: `src/hooks/` (Ready for implementation)

---

## 🛣️ Routing Structure

```
/                 → Home
/courses          → Courses list
/course/:id       → Course details
/login            → Login form
/register         → Register form
/dashboard        → User dashboard (protected)
*                 → 404 Not found
```

---

## 📊 State Management

### Auth Store (Zustand)
```javascript
useAuthStore()
  ├── user: Object
  ├── isAuthenticated: Boolean
  ├── login(userData): void
  ├── logout(): void
  └── updateProfile(updates): void
```

### Course Store (Zustand)
```javascript
useCourseStore()
  ├── enrolledCourses: Array
  ├── enrollCourse(courseId): void
  ├── updateProgress(courseId, progress): void
  └── getProgress(courseId): number
```

---

## 🎨 Styling Guide

### Global CSS Variables
Located in `src/styles/globals.css`

**Colors**:
```css
--primary: #4f46e5
--primary-light: #6366f1
--primary-dark: #4338ca
--secondary: #ec4899
--success: #10b981
--warning: #f59e0b
--error: #ef4444
```

**Light Theme**:
```css
--background: #ffffff
--surface: #f9fafb
--text-primary: #1f2937
--text-secondary: #6b7280
--border: #e5e7eb
```

**Dark Theme**:
```css
--dark-bg: #0f172a
--dark-surface: #1e293b
--dark-text: #f1f5f9
--dark-text-secondary: #cbd5e1
```

### CSS Classes
- `.fade-in` - Fade animation
- `.slide-up` - Slide up animation
- `.btn` - Button base styles
- `.container` - Max-width container

---

## 🔄 Component Composition Pattern

```
App (Main Router)
├── Navbar (Layout)
├── Routes
│   ├── Home
│   │   ├── HeroSection
│   │   ├── CourseCard (x6)
│   │   └── ReviewCard (x3)
│   ├── Courses
│   │   ├── FilterBar
│   │   └── CourseCard (x8)
│   ├── CourseDetails
│   │   ├── ReviewCard (x2)
│   │   └── (sidebar)
│   ├── Login/Register
│   │   └── (forms)
│   └── Dashboard (Protected)
│       ├── (sidebar)
│       └── (tabs content)
└── Footer (Layout)
```

---

## 🧪 Testing Components

### Example Test Cases

**CourseCard**:
```javascript
// Test that course data is displayed
// Test that click navigates to details
// Test responsive layout
```

**FilterBar**:
```javascript
// Test search input updates state
// Test category filter works
// Test price range filter
```

**ProtectedRoute**:
```javascript
// Test redirects if not authenticated
// Test allows access if authenticated
```

---

## 📚 Component Best Practices Used

✅ **Functional Components**: All components are functional
✅ **Props Drilling Minimized**: Uses Zustand for state
✅ **Separation of Concerns**: Styles in separate CSS files
✅ **Reusability**: Maximum component reuse
✅ **Accessibility**: Semantic HTML, ARIA attributes
✅ **Performance**: Proper memoization where needed
✅ **Documentation**: Comments in complex logic
✅ **Consistency**: Unified component patterns

---

## 🚀 Creating New Components

### Template Structure
```jsx
import './NewComponent.css';

export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="new-component">
      <h2>{prop1}</h2>
      <p>{prop2}</p>
    </div>
  );
}
```

### Add to App.jsx
```jsx
import NewComponent from './components/NewComponent';

<Route path="/new" element={<NewComponent />} />
```

---

## 📖 Component Props Validation

All components follow consistent prop patterns:
- Clear prop names
- Type hints in JSDoc
- Default values where applicable
- Prop spreading for styles

---

## 🎯 Component Hierarchy

```
Presentational (UI only)
├── CourseCard
├── ReviewCard
└── HeroSection

Container (Logic)
├── Navbar
├── FilterBar
├── Pages (Home, Courses, etc.)
└── ProtectedRoute

Layout
├── Navbar
└── Footer
```

---

This guide provides all information needed to understand, modify, and extend the EduVerse component system.

For specific component implementations, refer to the source files in `src/components/` and `src/pages/`.
