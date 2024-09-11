/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStores } from "../../redux/stores";
import { getProducts } from "../../redux/products";
import StoreCard from "../StoreCard/StoreCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./Home.css";
import ProductCard from "../ProductCard/ProductCard";

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const stores = useSelector((state) => state.stores.allStores);
  const products = useSelector((state) => state.products.allProducts);

  const storesArr =
    Object.values(stores).length > 10
      ? Object.values(stores).slice(0, 11)
      : Object.values(stores);

  const productsArr =
    Object.values(products).length > 10
      ? Object.values(products).slice(0, 11)
      : Object.values(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStores());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='home-container'>
      <h1>Featured Stores</h1>
      <p className='tagline'>
        Discover the best local and online stores, carefully curated for your
        convenience. Shop from trusted sellers and explore new favorites today.
      </p>
      {storesArr.length !== 0 ? (
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          infinite={true}
          centerMode={true}
          containerClass='carousel-container'
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item'
        >
          {storesArr.map((store) => (
            <StoreCard store={store} />
          ))}
        </Carousel>
      ) : (
        <p>Currently no stores</p>
      )}

      <h1>Featured Products</h1>
      <p className='tagline'>
        Browse our top-rated products, handpicked just for you. Find everything
        you need, from everyday essentials to unique finds.
      </p>

      {productsArr.length !== 0 ? (
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          infinite={true}
          centerMode={true}
          containerClass='carousel-container'
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item'
        >
          {productsArr.map((prod) => (
            <ProductCard product={prod} />
          ))}
        </Carousel>
      ) : (
        <p>Currently no products</p>
      )}
    </div>
  );
};

export default Home;
