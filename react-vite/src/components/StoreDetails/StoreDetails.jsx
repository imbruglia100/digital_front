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

const StoreDetails = ({ edit }) => {
  const { storeId } = useParams();
  const store = useSelector((state) => state.stores.selectedStore);
  const [reviews, setReviews] = useState([])
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  useEffect(() => {
    dispatch(clearSelected());
    dispatch(getSelectedStore(+storeId));
    dispatch(getProductsByStoreId(+storeId));
  }, [dispatch]);

  useEffect(() => {
    store?.Reviews && setReviews(Object.values(store?.Reviews))
  }, [store]);

  // useEffect(() => {
  //   if(edit && user?.id !== store?.owner_id){
  //     navigate(`/stores/${storeId}`)
  //   }
  // }, [store, user])

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
              5.0 <FontAwesomeIcon icon={faStar} />
            </a>
            {
              user && store.id !== user.id && !reviews.find(ele => ele.user_id === user.id) &&
                <a><span className="navlink">Create Review</span></a>

            }
          </div>
        </div>
        <div id='store-description'>{store.description}</div>
      </div>
        {reviews &&
          reviews.map(ele => {
          console.log(Object.keys(ele.User))
          return <p>{ele.User.username}</p>
          })}
      <ProductList />
    </div>
  );
};

export default StoreDetails;
