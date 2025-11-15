import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          EduVerse
        </Link>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/courses" className="nav-link" onClick={() => setIsOpen(false)}>
            Courses
          </Link>
          <a href="#about" className="nav-link">
            About
          </a>

          <div className="nav-auth">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">{user?.name}</span>
                <Link to="/dashboard" className="nav-btn primary">
                  Dashboard
                </Link>
                <button className="nav-btn logout" onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-btn secondary">
                  Login
                </Link>
                <Link to="/register" className="nav-btn primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
