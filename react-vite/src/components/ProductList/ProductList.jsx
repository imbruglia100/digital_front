/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterSearchBar from "../FilterSearchBar";
import "./ProductList.css";
import ProductCard from "../ProductCard";
import { NavLink } from "react-router-dom";

const ProductList = ({ userProduct }) => {
  const products = useSelector((state) => state.products.allProducts);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(
    products ? Object.values(products) : []
  );

  useEffect(() => {
    if (!products?.isLoading) {
      setFilteredProducts(
        Object.values(products).filter((val) => {
          if (search) {
            return val.title.toLowerCase().startsWith(search.toLowerCase());
          } else {
            return Object.values(products);
          }
        })
      );
    }
  }, [products, search]);

  useEffect(() => {
    if (filter) {
    }
  }, [filter]);

  return (
    <div id='products-list-cont'>
      <div className='product-actions'>
        {userProduct ?
        <NavLink className='primary-btn' to={"/products/create"}>
          Create new Product
        </NavLink>
        :
        <div></div>
      }
        <div>

          <FilterSearchBar
            setSearch={setSearch}
            setFilter={setFilter}
            search={search}
            filter={filter}
          />
        </div>
      </div>
      <div className='list-cards'>
        {!products?.isLoading ? (
          filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product, key) =>
                product !== "isLoading" ? (
                  <ProductCard key={key} product={product} userProduct />
                ) : (
                  ""
                )
              )}
              {/* {userProduct && <CreateAProdcut />} */}
            </>
          ) : (
            <p>No Products found</p>
          )
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
