/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./ProductDetials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { LoadingImage } from "../LoadingItems/LoadingImage";
import DeleteProductModal from "./DeleteProductModal";
import { getSelectedProduct, clearSelected } from "../../redux/products";

const ProductDetials = ({ edit }) => {
  const { productId } = useParams();
  const product = useSelector((state) => state.products.selectedProduct);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelected());
    dispatch(getSelectedProduct(+productId));
  }, [dispatch]);

  return (
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
        <h1>{product.title}</h1>

        <a style={{ color: "#A57C00", textDecoration: "none" }} href='#reviews'>
          5.0 <FontAwesomeIcon icon={faStar} />
        </a>
      </div>
    </div>
  );
};

export default ProductDetials;
