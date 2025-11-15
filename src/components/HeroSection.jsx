import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Learn Anything, <span>Anytime, Anywhere</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Join millions of learners discovering new skills with EduVerse. From web development to cybersecurity,
            find your next course today.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/courses')}>
              Explore Courses <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/courses')}>
              View Trending
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-stats">
            <div className="stat">
              <h3>50K+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat">
              <h3>150+</h3>
              <p>Expert Courses</p>
            </div>
            <div className="stat">
              <h3>95%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="floating-card card-1">
            <div className="card-icon">📱</div>
            <p>Learn on any device</p>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🎓</div>
            <p>Get certified</p>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">💼</div>
            <p>Advance your career</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
