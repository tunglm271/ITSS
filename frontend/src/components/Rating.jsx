import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rating = ({ postId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ratings/posts/${postId}`);
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = { rating, postId, comment };
      const response = await axios.post('http://localhost:5000/api/ratings', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Rating submitted:', response.data);
      fetchRatings();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const data = { rating, comment };
      const response = await axios.put(`http://localhost:5000/api/ratings/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Rating updated:', response.data);
      fetchRatings();
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/ratings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Rating deleted');
      fetchRatings();
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  return (
    <div>
      <h3>Đánh giá bài viết</h3>
      <select value={rating} onChange={handleRatingChange}>
        <option value={0}>Chọn đánh giá</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Nhập bình luận của bạn"
      />
      <button onClick={handleSubmit}>Gửi đánh giá</button>

      <h3>Danh sách đánh giá</h3>
      <ul>
        {ratings.map((rating) => (
          <li key={rating.id}>
            <p>Rating: {rating.rating}</p>
            <p>Comment: {rating.comment}</p>
            <button onClick={() => handleUpdate(rating.id)}>Update</button>
            <button onClick={() => handleDelete(rating.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rating;