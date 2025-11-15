import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, BarChart3, LogOut, Edit2, Save } from 'lucide-react';
import { useAuthStore, useCourseStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import './Dashboard.css';

export default function Dashboard() {
  const { user, updateProfile, logout } = useAuthStore();
  const { enrolledCourses } = useCourseStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const enrolledCoursesData = coursesData.filter((course) => enrolledCourses.includes(course.id));

  const handleSaveProfile = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    updateProfile({
      name: formData.name,
      email: formData.email,
    });
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <motion.aside
          className="dashboard-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="user-card">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
          </div>

          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              <BookOpen size={20} />
              My Courses
            </button>
            <button
              className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('progress')}
            >
              <BarChart3 size={20} />
              Progress
            </button>
            <button
              className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              Settings
            </button>
          </nav>

          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* My Courses Tab */}
          {activeTab === 'courses' && (
            <div className="tab-content">
              <h2>My Courses</h2>

              {enrolledCoursesData.length > 0 ? (
                <motion.div
                  className="courses-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {enrolledCoursesData.map((course) => (
                    <motion.div key={course.id} className="enrolled-course-card" variants={itemVariants}>
                      <div className="course-img">
                        <img src={course.thumbnail} alt={course.title} />
                      </div>
                      <div className="course-info">
                        <h4>{course.title}</h4>
                        <p className="instructor">{course.instructor}</p>
                        <div className="progress-section">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                          </div>
                          <span className="progress-text">{course.progress}% Complete</span>
                        </div>
                        <button className="btn-continue" onClick={() => navigate(`/course/${course.id}`)}>
                          Continue Learning
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="empty-state">
                  <BookOpen size={48} />
                  <h3>No courses enrolled yet</h3>
                  <p>Start learning by exploring our courses</p>
                  <button className="btn-primary" onClick={() => navigate('/courses')}>
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="tab-content">
              <h2>Learning Progress</h2>

              {enrolledCoursesData.length > 0 ? (
                <motion.div
                  className="progress-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {enrolledCoursesData.map((course) => (
                    <motion.div key={course.id} className="progress-card" variants={itemVariants}>
                      <div className="progress-card-header">
                        <h4>{course.title}</h4>
                        <span className="progress-percentage">{course.progress}%</span>
                      </div>
                      <div className="progress-bar-lg">
                        <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                      </div>
                      <div className="progress-stats">
                        <div className="stat">
                          <span className="stat-label">Lessons Completed</span>
                          <span className="stat-value">
                            {course.lessons.filter((l) => l.completed).length}/{course.lessons.length}
                          </span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Time Spent</span>
                          <span className="stat-value">{course.lessons.length * 5}h</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="empty-state">
                  <BarChart3 size={48} />
                  <h3>No progress yet</h3>
                  <p>Enroll in courses to start tracking your progress</p>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2>Account Settings</h2>

              <motion.div
                className="settings-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3>Profile Information</h3>

                {isEditingProfile ? (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />

                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />

                    <div className="button-group">
                      <button className="btn-save" onClick={handleSaveProfile}>
                        <Save size={18} />
                        Save Changes
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => {
                          setIsEditingProfile(false);
                          setFormData({ name: user?.name || '', email: user?.email || '' });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-info">
                    <div className="info-field">
                      <label>Full Name</label>
                      <p>{user?.name}</p>
                    </div>
                    <div className="info-field">
                      <label>Email</label>
                      <p>{user?.email}</p>
                    </div>
                    <button className="btn-edit" onClick={() => setIsEditingProfile(true)}>
                      <Edit2 size={18} />
                      Edit Profile
                    </button>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="settings-card danger-zone"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3>Danger Zone</h3>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn-delete" onClick={() => toast.error('Feature coming soon')}>
                  Delete Account
                </button>
              </motion.div>
            </div>
          )}
        </motion.main>
      </div>
    </div>
  );
}
