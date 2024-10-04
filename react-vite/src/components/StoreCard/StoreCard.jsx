/** @format */

import { NavLink } from "react-router-dom";
import "./StoreCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const StoreCard = ({ store }) => {
  const totalRating = store.Reviews
    ? Object.values(store.Reviews).reduce(
        (accu, review) =>
          accu + review.rating,
        0
      )
    : 0;
  const reviewLength = store.Reviews ? Object.values(store.Reviews).length : 0
  return (
    <NavLink to={`/stores/${store.id}`} className='store-card-container'>
      <div className='store-img-container'>
        <div className='banner-container'>
          <img className='banner' src={store.store_banner_url} />
        </div>
        <div className='store-picture-container'>
          <img className='store-picture' src={store.store_img_url} />
        </div>
      </div>

      <div className='store-info'>
        <div className='first-half-store-info'>
          <h2>{store.name}</h2>
          <p
            style={{ color: "#A57C00", textDecoration: "none" }}
            href='#reviews'
          >
            {
              reviewLength > 0 ?
                (totalRating/reviewLength).toFixed(1)
                : 'New'
            } <FontAwesomeIcon icon={faStar} />
          </p>
        </div>
        <div className='second-half-store-info'>
          <p className='store-type'>{store.type}</p>
          <p>{reviewLength} Reviews</p>
        </div>
      </div>
    </NavLink>
  );
};

export default StoreCard;
