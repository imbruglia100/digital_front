/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./EditAProduct.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { editAProduct } from "../../redux/products";
import { getUserStores } from "../../redux/stores";

const EditAProduct = () => {
  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.selectedProduct);
  const userStores = useSelector((state) => state.stores.allStores);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedProduct, setUpdatedProduct] = useState({
    id: product?.id,
    store_id: product?.store_id,
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || 0,
    product_img: product?.product_img || "",
    stock_amount: product?.stock_amount || 0,
  });

  const [productImgFile, setProductImgFile] = useState(null);

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  useEffect(() => {
    dispatch(getUserStores());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProductImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(updatedProduct).forEach(key => {
      formData.append(key, updatedProduct[key]);
    });

    if (productImgFile) {
      formData.append("product_img", productImgFile);
    } else if (updatedProduct.product_img) {
      formData.append("product_img", updatedProduct.product_img);
    }

    console.log('Submitting form data:', Object.fromEntries(formData));

    const response = await dispatch(editAProduct(formData));
    if (response.errors) {
      console.error('Error updating product:', response.errors);
    } else {
      navigate(`/products/${updatedProduct.id}`);
    }
  };

  return user ? (
    <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Update Your Product</h1>

      <div className='form-item'>
        <label>Title</label>
        <input
          value={updatedProduct.title}
          onChange={handleChange}
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Description</label>
        <textarea
          value={updatedProduct.description}
          onChange={handleChange}
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Price</label>
        <input
          value={`$${updatedProduct.price}`}
          onChange={handleChange}
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Stock Amount</label>
        <input
          value={updatedProduct.stock_amount}
          onChange={handleChange}
          required
          type='number'
        />
      </div>

      <div className='form-item'>
        <label>Store</label>
        <select
          required
          onChange={(e) =>
            setUpdatedProduct((prev) => {
              return { ...prev, store_id: e.target.value };
            })
          }
        >
          {Object.values(userStores).map((el) => {
            return <option value={el.id}>{el.name}</option>;
          })}
        </select>
      </div>

      <div className='form-item'>
        <label>Product Image</label>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
        />
      </div>
      <button className='primary-btn' type='submit'>
        Submit
      </button>
    </form>
  ) : (
    <Navigate to='/login' />
  );
};

export default EditAProduct;
