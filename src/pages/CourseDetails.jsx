import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Users, Award, CheckCircle, Play } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import { useAuthStore } from '../stores/authStore';
import { useCourseStore } from '../stores/authStore';
import { formatPrice, ratingColor } from '../utils/helpers';
import ReviewCard from '../components/ReviewCard';
import toast from 'react-hot-toast';
import './CourseDetails.css';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.id === parseInt(id));
  const { isAuthenticated } = useAuthStore();
  const { enrolledCourses, enrollCourse } = useCourseStore();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <button onClick={() => navigate('/courses')}>Back to Courses</button>
      </div>
    );
  }

  const isEnrolled = enrolledCourses.includes(course.id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll');
      navigate('/login');
      return;
    }

    enrollCourse(course.id);
    toast.success('Successfully enrolled in course!');
  };

  const handleSubmitReview = () => {
    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    toast.success('Review submitted successfully!');
    setReview('');
    setRating(0);
  };

  const mockReviews = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://i.pravatar.cc/150?img=10',
      role: 'Developer',
      rating: 5,
      content: 'Excellent course! Very well structured and easy to follow.',
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://i.pravatar.cc/150?img=11',
      role: 'Designer',
      rating: 4,
      content: 'Great content but some concepts could be explained better.',
      date: '1 month ago',
    },
  ];

  return (
    <div className="course-details">
      {/* Banner Section */}
      <motion.div
        className="course-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img src={course.thumbnail} alt={course.title} className="banner-image" />
        <div className="banner-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {course.title}
          </motion.h1>
        </div>
      </motion.div>

      <div className="course-details-container">
        <div className="course-main">
          {/* Course Info */}
          <motion.section
            className="section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="course-meta">
              <div className="meta-item">
                <Star size={20} fill={ratingColor(course.rating)} color={ratingColor(course.rating)} />
                <div>
                  <span className="meta-value">{course.rating}</span>
                  <span className="meta-label">({course.reviews} reviews)</span>
                </div>
              </div>
              <div className="meta-item">
                <Clock size={20} />
                <div>
                  <span className="meta-value">{course.duration}</span>
                  <span className="meta-label">Duration</span>
                </div>
              </div>
              <div className="meta-item">
                <Users size={20} />
                <div>
                  <span className="meta-value">{Math.floor(Math.random() * 5000) + 100}</span>
                  <span className="meta-label">Enrolled</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Description */}
          <motion.section
            className="section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>About This Course</h2>
            <p>{course.description}</p>
          </motion.section>

          {/* Instructor */}
          <motion.section
            className="section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Your Instructor</h2>
            <div className="instructor-card">
              <img src={course.instructorImage} alt={course.instructor} className="instructor-image" />
              <div className="instructor-info">
                <h3>{course.instructor}</h3>
                <p>Expert instructor with years of experience in the field</p>
              </div>
            </div>
          </motion.section>

          {/* Lessons */}
          {course.lessons && course.lessons.length > 0 && (
            <motion.section
              className="section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Course Lessons</h2>
              <div className="lessons-list">
                {course.lessons.map((lesson, idx) => (
                  <div key={lesson.id} className={`lesson-item ${selectedLesson === idx ? 'active' : ''}`} onClick={() => setSelectedLesson(idx)}>
                    <div className="lesson-header">
                      <Play size={16} />
                      <span className="lesson-title">{lesson.title}</span>
                      {lesson.completed && <CheckCircle size={16} />}
                    </div>
                    <span className="lesson-duration">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Reviews */}
          <motion.section
            className="section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Student Reviews</h2>
            <div className="reviews-container">
              {mockReviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>

            {isEnrolled && (
              <div className="add-review">
                <h3>Leave a Review</h3>
                <div className="rating-input">
                  <label>Your Rating</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`star ${star <= rating ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                        type="button"
                      >
                        <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  placeholder="Write your review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="review-textarea"
                />
                <button className="btn-submit-review" onClick={handleSubmitReview}>
                  Submit Review
                </button>
              </div>
            )}
          </motion.section>
        </div>

        {/* Sidebar */}
        <motion.aside
          className="course-sidebar"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="sidebar-card">
            <div className="price-section">
              <span className="price">{formatPrice(course.price)}</span>
              {course.price === 0 && <span className="free-badge">FREE</span>}
            </div>

            {!isEnrolled ? (
              <button className="btn-enroll" onClick={handleEnroll}>
                Enroll Now
              </button>
            ) : (
              <div className="enrolled-badge">
                <CheckCircle size={20} />
                Enrolled
              </div>
            )}

            <div className="course-features">
              <div className="feature">
                <Clock size={18} />
                <span>Self-paced learning</span>
              </div>
              <div className="feature">
                <Award size={18} />
                <span>Certificate included</span>
              </div>
              <div className="feature">
                <Users size={18} />
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
