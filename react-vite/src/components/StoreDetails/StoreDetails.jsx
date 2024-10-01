/** @format */

import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { clearSelected, getSelectedStore } from "../../redux/stores";
import "./StoreDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteStoreModal from "./DeleteStoreModal";
import { LoadingImage } from "../LoadingItems/LoadingImage";
import ProductList from "../ProductList/ProductList";
import { getProductsByStoreId } from "../../redux/products";
import ReviewCard from "../ReviewCard/ReviewCard";

const StoreDetails = ({ edit }) => {
  const { storeId } = useParams();
  const store = useSelector((state) => state.stores.selectedStore);
  const [reviewAverage, setReviewAverage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [tabFocus, setTabFocus] = useState("products");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleChangeTab = (type) => {
    setTabFocus(type);
  };
  useEffect(() => {
    dispatch(clearSelected());
    dispatch(getSelectedStore(+storeId));
    dispatch(getProductsByStoreId(+storeId));
  }, [dispatch]);

  useEffect(() => {
    setReviewAverage(0);
    store?.Reviews && setReviews(Object.values(store?.Reviews));
  }, [store]);

  useEffect(() => {
    reviews.length > 0 &&
      setReviewAverage(
        (
          reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
        ).toFixed(1)
      );
  }, [reviews]);

  return (
    <div id='store-details-container'>
      <div className='store-img-container'>
        <div id='selected-store-banner' className='banner-container'>
          {!store.isLoading ? (
            <>
              <img className='banner' src={store.store_banner_url} />
              {user && user?.id === store.owner_id && (
                <div id='user-action-buttons'>
                  <NavLink to={"edit"} className='primary-btn edit-btn'>
                    Edit
                  </NavLink>
                  <OpenModalMenuItem
                    modalComponent={<DeleteStoreModal storeId={store.id} />}
                    itemText='Delete'
                    className='primary-btn delete-btn'
                  />
                </div>
              )}
            </>
          ) : (
            <LoadingImage />
          )}
        </div>
        <div className='store-picture-container'>
          <img
            id='selected-store-picture'
            className='store-picture'
            src={store.store_img_url}
          />
        </div>
      </div>
      <div className='store-detials-body'>
        <div>
          <h1>{store.name}</h1>
          <div>
            <a
              style={{ color: "#A57C00", textDecoration: "none" }}
              href='#reviews'
            >
              {reviewAverage !== 0 ? reviewAverage : "No Reviews"}{" "}
              <FontAwesomeIcon icon={faStar} />
            </a>
            {user &&
              store.id !== user.id &&
              !reviews.find((ele) => ele.user_id === user.id) && (
                <a>
                  <span className='navlink'>Create Review</span>
                </a>
              )}
          </div>
        </div>
        <div id='store-description'>{store.description}</div>
      </div>
      <div className='tabs-container'>
        <p onClick={() => setTabFocus("products")}>Products</p>•
        <p onClick={() => setTabFocus("reviews")}>Reviews</p>
      </div>
      {tabFocus === "products" && <ProductList />}

      {tabFocus === "reviews" ? (
        reviews ? (
          <>
            {user &&
              reviews.filter((ele) => ele.User.id === user.id).length === 0 && (
                <button className="primary-btn">Create a Review</button>
              )}
            {reviews.map((ele) => {
              return <ReviewCard review={ele} />;
            })}
          </>
        ) : (
          <h1>No reviews found</h1>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default StoreDetails;
