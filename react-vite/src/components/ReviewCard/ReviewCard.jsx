/** @format */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ReviewCard.css'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
const ReviewCard = ({ review }) => {
  const user = useSelector(state=> state.session.user)

  return (
    <div className='review-container'>
      <h2>{review.title}</h2>
      <div className='rating-container'>
        <p style={{ color: "#A57C00", textDecoration: "none" }}>{review.rating.toFixed(1)} <FontAwesomeIcon icon={faStar} /></p>
        <p>{review.User.username}</p>
      </div>
        <p id='time'>12/10 5:21pm</p>
      <p>{review.description}</p>
      {
        user && user.id === review.User.id
          &&
          <div className='user-action-buttons'>
            <button className='primary-btn'>Edit</button>
            <button className='delete-btn primary-btn'>Delete</button>
          </div>
      }
    </div>
  );
};

export default ReviewCard;
