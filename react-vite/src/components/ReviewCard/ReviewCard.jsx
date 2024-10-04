/** @format */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ReviewCard.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateReview from "../CreateReview/CreateReview";
import DeleteReview from "../CreateReview/DeleteReview";
const ReviewCard = ({ review, product }) => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className='review-container'>
      <h2>{review.title}</h2>
      <div className='rating-container'>
        <p style={{ color: "#A57C00", textDecoration: "none" }}>
          {review.rating.toFixed(1)} <FontAwesomeIcon icon={faStar} />
        </p>
        <p>{review.User.username}</p>
      </div>
      <p id='time'>12/10 5:21pm</p>
      <p>{review.description}</p>
      {user && user.id === review.User.id && (
        <div className='user-action-buttons'>
          <OpenModalMenuItem
            itemText='Edit'
            modalComponent={
              product ?
              <CreateReview product_id={review.product_id} review={review} />:
              <CreateReview store_id={review.store_id} review={review} />
            }
            className='primary-btn'
          />
          <OpenModalMenuItem
            itemText='Delete'
            modalComponent={<DeleteReview review={review} product={product} />}
            className='delete-btn primary-btn'
          />
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
