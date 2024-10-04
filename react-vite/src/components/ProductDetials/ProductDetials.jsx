/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./ProductDetials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { LoadingImage } from "../LoadingItems/LoadingImage";
import DeleteProductModal from "./DeleteProductModal";
import { getSelectedProduct, clearSelected } from "../../redux/products";
import ReviewCard from "../ReviewCard/ReviewCard";
import CreateReview from "../CreateReview/CreateReview";

const ProductDetials = ({ edit }) => {
  const { productId } = useParams();
  const product = useSelector((state) => state.products.selectedProduct);
  const [reviews, setReviews] = useState([]);
  const [reviewAvg, setReviewAvg] = useState(0);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelected());
    dispatch(getSelectedProduct(+productId));
  }, [dispatch]);

  useEffect(() => {
    setReviewAvg(0);
    product.Reviews && setReviews(Object.values(product.Reviews));
  }, [product]);

  useEffect(() => {
    reviews.length > 0 &&
      setReviewAvg(
        (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
        ).toFixed(1)
      );
  }, [reviews]);

  return (
    <div className='product-page-container'>
      <div id='product-details-container'>
        <div className='product-detials-img-container'>
          {!product.isLoading ? (
            <>
              <img className='banner' src={product?.product_img} />
            </>
          ) : (
            <LoadingImage />
          )}
        </div>
        <div className='product-detials-body'>
          <div>
            <h1>{product.title}</h1>
            <span>{product.stock_amount} left</span>
            <h2>${product.price}</h2>
            <a
              style={{ color: "#A57C00", textDecoration: "none" }}
              href='#reviews'
            >
              {reviews.length !== 0 ? reviewAvg : "No Reviews"}{" "}
              <FontAwesomeIcon icon={faStar} />
            </a>
          </div>
          <div>
            <h3>{product.description}</h3>
            <select>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
            <button
              className='primary-btn'
              onClick={() => alert("Feature is under development.")}
            >
              Add to cart
            </button>
          </div>
        </div>
        {user && user?.id === product?.Store?.owner_id && (
          <div id='user-action-buttons'>
            <NavLink to={"edit"} className='primary-btn edit-btn'>
              Edit
            </NavLink>
            <OpenModalMenuItem
              modalComponent={<DeleteProductModal productId={product.id} />}
              itemText='Delete'
              className='primary-btn delete-btn'
            />
          </div>
        )}
      </div>
      <div className='reviews-container'>
        <div className='reviews-header'>
          <h1>Reviews</h1>
          {user &&
            user.id !== product?.Store?.Owner.id &&
            reviews.filter((ele) => ele.User.id === user.id).length === 0 && (
              <div className='center-container'>
                <OpenModalMenuItem
                  className='primary-btn create-review-btn'
                  modalComponent={<CreateReview product_id={product.id} />}
                  itemText='Create A Review'
                />
              </div>
            )}
        </div>
        {reviews.length > 0
          ? reviews.map((rev) => <ReviewCard review={rev} product={true} />)
          : user &&
            user.id !== product?.Store?.Owner.id &&
            reviews.filter((ele) => ele.User.id === user.id).length === 0 && (
              <div className='center-container'>
                <OpenModalMenuItem
                  className='primary-btn create-review-btn'
                  modalComponent={<CreateReview product_id={product.id} />}
                  itemText='Create A Review'
                />
              </div>
            )}
      </div>
    </div>
  );
};

export default ProductDetials;
