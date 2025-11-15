import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Palette, Lightbulb, Shield } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CourseCard from '../components/CourseCard';
import ReviewCard from '../components/ReviewCard';
import { coursesData, categories, testimonials } from '../data/coursesData';
import './Home.css';

const iconMap = {
  Globe,
  Palette,
  Lightbulb,
  Shield,
  Code: Lightbulb,
};

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const topCourses = coursesData.slice(0, 6);

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
    <div className="home">
      <HeroSection />

      {/* Featured Categories */}
      <section className="categories-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Explore Categories</h2>
            <p>Find courses in your area of interest</p>
          </motion.div>

          <motion.div
            className="categories-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon] || Lightbulb;
              return (
                <motion.div
                  key={category.id}
                  className="category-card"
                  variants={itemVariants}
                  onClick={() => navigate(`/courses?category=${category.name}`)}
                  style={{ '--category-color': category.color }}
                >
                  <div className="category-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{Math.floor(Math.random() * 30) + 10} courses</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Top Courses */}
      <section className="courses-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Top Rated Courses</h2>
            <p>Learn from the best instructors</p>
          </motion.div>

          <motion.div
            className="courses-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {topCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="view-all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <button className="btn btn-outline" onClick={() => navigate('/courses')}>
              View All Courses
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>What Our Students Say</h2>
            <p>Real reviews from real learners</p>
          </motion.div>

          <motion.div
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <ReviewCard review={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students who are advancing their careers with EduVerse</p>
            <button className="btn btn-primary" onClick={() => navigate('/courses')}>
              Explore Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
