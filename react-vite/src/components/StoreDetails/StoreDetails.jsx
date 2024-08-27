/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { clearSelected, getSelectedStore } from "../../redux/stores";
import "./StoreDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteStoreModal from "./DeleteStoreModal";

const LoadingImg = () => {
  return "";
};

const StoreDetails = () => {
  const { storeId } = useParams();
  const store = useSelector((state) => state.stores.selectedStore);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelected())
    dispatch(getSelectedStore(+storeId));
  }, [dispatch]);

  return (
    <div id='store-details-container'>
      <div className='store-img-container'>
        <div id='selected-store-banner' className='banner-container'>
          <img className='banner' src={store.store_banner_url} />
          {user?.id === store.owner_id && (
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
          <a
            style={{ color: "#A57C00", textDecoration: "none" }}
            href='#reviews'
          >
            5.0 <FontAwesomeIcon icon={faStar} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
