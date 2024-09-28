/** @format */

import { NavLink } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faStar } from "@fortawesome/free-solid-svg-icons";
const ProductCard = ({ product }) => {
  const reviewTotal = product.Reviews
    ? Object.values(product.Reviews).reduce((acc, rev) => acc + rev.rating, 0)
    : 0;
  const reviewLength = product.Reviews
    ? Object.values(product.Reviews).length
    : 0;
  return product ? (
    <NavLink to={`/products/${product?.id}`} className='product-card-container'>
      <div className='product-img-container'>
        <div className='banner-container'>
          <img className='banner' src={product?.product_img} />
        </div>
        <NavLink
          to={`/stores/${product?.Store?.id}`}
          className='product-store-container'
        >
          <p className='store-thumbnail-text navlink'>{product?.Store?.name}</p>
        </NavLink>
        <h3 style={{ margin: "4px" }}>{product?.title}</h3>
      </div>

      <div className='product-info'>
        <div className='second-half-product-info'>
          <p style={{ fontSize: "20px", fontWeight: "600", margin: "5px" }}>
            ${product.price}
          </p>
          {product?.description ? (
            <p style={{ margin: "5px", textAlign: "center" }}>
              {product.description}
            </p>
          ) : (
            <></>
          )}
          {product?.stock_amount <= 25 ? (
            <p className='product-amount'>
              {product?.stock_amount} left in stock!
            </p>
          ) : (
            <div></div>
          )}
        </div>
        <div className='first-half-product-info'>
          {reviewLength > 0 ? (
            <>
              <a style={{ color: "#2845c7" }}>
                {reviewLength} <FontAwesomeIcon icon={faFileLines} />
              </a>
              •
              <a
                style={{ color: "#A57C00", textDecoration: "none" }}
                href='#reviews'
              >
                {(reviewTotal/reviewLength).toFixed(1)} <FontAwesomeIcon icon={faStar} />
              </a>
            </>
          ) : (
            <p>No Reviews</p>
          )}
        </div>
      </div>
    </NavLink>
  ) : (
    <></>
  );
};

export default ProductCard;
