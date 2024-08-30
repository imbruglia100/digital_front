/** @format */

import { NavLink } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const ProductCard = ({ product, userProduct }) => {

  return (
    <NavLink
      to={userProduct ? `stores/${product.Store.id}/products/${product.id}` : `${product.id}`}
      className='product-card-container'
    >
      <div className='product-img-container'>
        <div className='banner-container'>
          <img className='banner' src={product.product_img} />
        </div>
        <NavLink to={`/stores/${product.Store.id}`} className='product-picture-container'>
          <img className='store-thumbnail' src={product.Store.store_img_url} />
        </NavLink>
          <p className='store-thumbnail-text'>{product.Store.name}</p>
      </div>

      <div className='product-info'>
        <div className='first-half-product-info'>
          <h2>{product.title}</h2>
          <a
            style={{ color: "#A57C00", textDecoration: "none" }}
            href='#reviews'
          >
            5.0 <FontAwesomeIcon icon={faStar} />
          </a>
        </div>
        <div className='second-half-product-info'>
          {
            product.stock_amount <= 25 ?
            <p className="product-amount">{product.stock_amount} left in stock</p>
            :
            <div></div>
          }
          <p>35 Reviews</p>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
