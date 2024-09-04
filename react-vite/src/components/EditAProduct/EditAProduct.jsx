/** @format */

import { useDispatch, useSelector } from "react-redux";
import "./EditAProduct.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { editAProduct } from "../../redux/products";
import { getUserStores } from "../../redux/stores";

const EditAProduct = () => {
  const user = useSelector((state) => state.session.user);
  const product = useSelector(state => state.products.selectedProduct)
  const userStores = useSelector(state=>state.stores.allStores)

  const dispatch = useDispatch();
  const [updatedProduct, setUpdatedProduct] = useState({
    id: product.id,
    store_id: product.store_id,
    title: product.title || "",
    description: product.description || "",
    price: product.price || 0.0,
    product_img: product.product_img || "",
    stock_amount: product.stock_amount || 0,
  });

  const navigate = useNavigate()

  useEffect( () => {
    setUpdatedProduct({...product})
  }, [product])

  useEffect(()=>{
    dispatch(getUserStores())
  },[dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addedProduct = await dispatch(editAProduct(updatedProduct));

    if (!addedProduct?.errors) {
        navigate(`/products/${product?.id}`)
    }
  };

  return user ? (
    <form action='POST' onSubmit={handleSubmit}>
      <h1>Update Your Product</h1>

      <div className='form-item'>
        <label>Title</label>
        <input
          value={updatedProduct.title}
          onChange={(e) =>
            setUpdatedProduct((prev) => ({ ...prev, title: e.target.value }))
          }
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Description</label>
        <textarea
          value={updatedProduct.description}
          required
          onChange={(e) =>
            setUpdatedProduct((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className='form-item'>
        <label>Price</label>
        <input
          value={`$${updatedProduct.price}`}
          onChange={(e) => {
            if (
              !e.target.value
                .toLowerCase()
                .includes("abcdefghijklmnopqrstuvwxyz".split(""))
            ) {
              setUpdatedProduct((prev) => ({
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
          value={updatedProduct.stock_amount}
          required
          onChange={(e) => {
            if (e.target.value >= 0) {
              setUpdatedProduct((prev) => ({
                ...prev,
                stock_amount: e.target.value,
              }));
            }
          }}
          type='number'
        />
      </div>

      <div className='form-item'>
        <label>Store</label>
        <select required onChange={(e) => setUpdatedProduct(prev=> {return {...prev, store_id:e.target.value}})}>
          {Object.values(userStores).map(el => {
            return <option value={el.id}>{el.name}</option>
          })}
        </select>
      </div>

      <div className='form-item'>
        <label>Product Image</label>
        <input
          value={updatedProduct.product_img}
          onChange={(e) =>
            setUpdatedProduct((prev) => ({ ...prev, product_img: e.target.value }))
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

export default EditAProduct;
