/** @format */

import { useDispatch, useSelector } from "react-redux";
import "./CreateAProductForm.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { addNewProduct } from "../../redux/products";

const CreateAProductForm = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    store_id: user?.id,
    title: "",
    description: "",
    price: 0.0,
    product_img: "",
    stock_amount: 0,
  });

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addedProduct = await dispatch(addNewProduct(newProduct));
    console.log(addedProduct, "awwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    if (!addedProduct?.errors) {
        navigate(`/products/${addedProduct.id}`)
        // return <Navigate to={`/products/${addedProduct.id}`} />;
    }
  };

  return user ? (
    <form action='POST' onSubmit={handleSubmit}>
      <h1>Create Your Product</h1>

      <div className='form-item'>
        <label>Title</label>
        <input
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Description</label>
        <textarea
          value={newProduct.description}
          required
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className='form-item'>
        <label>Price</label>
        <input
          value={`$${newProduct.price}`}
          onChange={(e) => {
            if (
              !e.target.value
                .toLowerCase()
                .includes("abcdefghijklmnopqrstuvwxyz".split(""))
            ) {
              setNewProduct((prev) => ({
                ...prev,
                price: e.target.value.split("$")[1] || "",
              }));
            }
          }}
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Stock Amount</label>
        <input
          value={newProduct.stock_amount}
          required
          onChange={(e) => {
            if (e.target.value >= 0) {
              setNewProduct((prev) => ({
                ...prev,
                stock_amount: e.target.value,
              }));
            }
          }}
          type='number'
        />
      </div>

      <div className='form-item'>
        <label>Product Image</label>
        <input
          value={newProduct.product_img}
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, product_img: e.target.value }))
          }
          type='text'
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

export default CreateAProductForm;
