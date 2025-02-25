import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PerformanceReviews = ({ userRole, employeeId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [error, setError] = useState('');

  // Fetch reviews for a specific employee (if employeeId is passed)
  useEffect(() => {
    if (employeeId) {
      fetchReviews(employeeId);
    }
  }, [employeeId]);

  // Fetch performance reviews from the backend
  const fetchReviews = async (employeeId) => {
    try {
      const response = await axios.get(`/api/reviews/${employeeId}`); // Adjust API endpoint
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  // Submit a new performance review (HR/Admin only)
  const submitReview = async () => {
    if (!reviewText || reviewRating === 0) {
      setError('Both review text and rating are required.');
      return;
    }

    const reviewData = {
      employeeId,
      reviewText,
      reviewRating,
    };

    try {
      await axios.post('/api/reviews', reviewData); // Adjust API endpoint
      fetchReviews(employeeId); // Refresh reviews after submitting
      setReviewText('');
      setReviewRating(0);
      setError('');
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div className="performance-reviews">
      <h2>Performance Reviews</h2>

      {/* Employee view of performance reviews */}
      {userRole === 'Employee' && (
        <div>
          <h3>Your Performance Reviews</h3>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p><strong>Rating:</strong> {review.rating}/5</p>
                  <p><strong>Review:</strong> {review.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}

      {/* HR/Admin can add performance reviews */}
      {(userRole === 'HR' || userRole === 'Admin') && (
        <div>
          <h3>Add Performance Review</h3>
          <div>
            <label>Review Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Review Text:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          <button onClick={submitReview}>Submit Review</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default PerformanceReviews;
