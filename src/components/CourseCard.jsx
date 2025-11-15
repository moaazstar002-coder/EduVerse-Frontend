import { Link } from 'react-router-dom';
import { Star, Users, Clock } from 'lucide-react';
import { formatPrice, ratingColor } from '../utils/helpers';
import './CourseCard.css';

export default function CourseCard({ course }) {
  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-image">
        <img src={course.thumbnail} alt={course.title} />
        <div className="category-badge">{course.category}</div>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>

        <div className="instructor-info">
          <img src={course.instructorImage} alt={course.instructor} className="instructor-avatar" />
          <span className="instructor-name">{course.instructor}</span>
        </div>

        <p className="course-description">{course.description}</p>

        <div className="course-meta">
          <div className="meta-item">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
          <div className="meta-item">
            <Users size={16} />
            <span>{Math.floor(Math.random() * 5000) + 100} students</span>
          </div>
        </div>

        <div className="course-footer">
          <div className="rating">
            <Star size={18} fill="currentColor" color={ratingColor(course.rating)} />
            <span className="rating-value">{course.rating}</span>
            <span className="rating-count">({course.reviews})</span>
          </div>
          <div className="price">{formatPrice(course.price)}</div>
        </div>
      </div>
    </Link>
  );
}
