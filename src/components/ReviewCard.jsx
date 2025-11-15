import { Star } from 'lucide-react';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <img src={review.image} alt={review.name} className="reviewer-avatar" />
          <div>
            <h4 className="reviewer-name">{review.name}</h4>
            <p className="reviewer-role">{review.role || 'Student'}</p>
          </div>
        </div>
        <div className="review-rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < review.rating ? 'currentColor' : 'none'}
              color={i < review.rating ? '#f59e0b' : '#d1d5db'}
            />
          ))}
        </div>
      </div>
      <p className="review-content">{review.content}</p>
      <p className="review-date">{review.date}</p>
    </div>
  );
}
