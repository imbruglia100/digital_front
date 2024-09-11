/** @format */

import { useDispatch, useSelector } from "react-redux";
import "./CreateAProductForm.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addNewProduct } from "../../redux/products";
import { getUserStores } from "../../redux/stores";
import e from "express";

const CreateAProductForm = () => {
  const user = useSelector((state) => state.session.user);
  const userStores = useSelector((state) => state.stores.allStores);
  const storesArr = Object.values(userStores);
  const [errors, setErrors] = useState({
  });

  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0.0,
    product_img: "",
    store_id: "",
    stock_amount: 0,
  });

  const navigate = useNavigate();

  const validPrice = (value) => {
    return /^[0-9]*\.?[0-9]{0,2}$/.test(value);
  };

  useEffect(() => {
    dispatch(getUserStores());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsTemp = {};
    if (!newProduct.title) errorsTemp.title = "Title is required.";
    if (!newProduct.description)
      errorsTemp.description = "Description is required.";
    if (!validPrice(newProduct.price))
      errorsTemp.price = "Invalid price format.";
    if (!newProduct.store_id) errorsTemp.store_id = "Store is required.";
    if (newProduct.stock_amount < 0 || isNaN(newProduct.stock_amount))
      ererrorsTemprors.stock_amount =
        "Stock amount must be a non-negative number.";
    console.log(errorsTemp)
    setErrors(errorsTemp);
    console.log(errors)

    if (Object.values(errors).length === 0) {
      const addedProduct = await dispatch(addNewProduct(newProduct));

      if (!addedProduct?.errors) {
        navigate(`/products/${addedProduct.id}`);
      }
    }
  };

  return user ? (
    storesArr.length > 0 ? (
      <form action='POST' onSubmit={handleSubmit}>
        <h1>Create Your Product</h1>

        <div className='form-item'>
          <label>
            Title<span className='required'>*</span>
          </label>
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
          <label>
            Description<span className='required'>*</span>
          </label>
          <textarea
            value={newProduct.description}
            required
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className='form-item'>
          <label>
            Price<span className='required'>*</span>
          </label>
          <input
            pattern='^\d+(?:\.\d{1,2})?$'
            value={newProduct.price}
            onChange={(e) => {
              if (validPrice(e.target.value)) {
                setNewProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }));
              }
            }}
            required
            type='text'
          />
        </div>

        <div className='form-item'>
          <label>
            Stock Amount<span className='required'>*</span>
          </label>
          <input
            value={newProduct.stock_amount}
            required
            max={99999}
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
          <label>
            Store<span className='required'>*</span>
          </label>
          <select
            required
            defaultValue={newProduct.store_id}
            onChange={(e) =>
              setNewProduct((prev) => {
                return { ...prev, store_id: +e.target.value };
              })
            }
          >
            <option value='' >Choose a Store</option>
            {storesArr.map((el) => (
              <option value={el.id}>{el.name}</option>
            ))}
          </select>
        </div>

        <div className='form-item'>
          <label>Product Image</label>
          <input
            value={newProduct.product_img}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                product_img: e.target.value,
              }))
            }
            type='text'
          />
        </div>
        <button className='primary-btn' type='submit'>
          Submit
        </button>
      </form>
    ) : (
      <h1>Must create a store first!</h1>
    )
  ) : (
    <Navigate to='/login' />
  );
};

export default CreateAProductForm;
