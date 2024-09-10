/** @format */

import { useDispatch, useSelector } from "react-redux";
import "./CreateAStoreForm.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addNewStore } from "../../redux/stores";

const CreateAStoreForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [newStore, setNewStore] = useState({
    owner_id: user?.id,
    name: "",
    description: "",
    type: "",
    store_img_url: new File([], 'untitled'),
    store_banner_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addedStore = await dispatch(addNewStore(newStore));

    console.log(addedStore, '================================================');
    if (addedStore?.id) {
      return navigate(`/stores/${addedStore.id}`);
    }
  };

  return user ? (
    <form action='POST' onSubmit={handleSubmit}>
      <h1>Create Your Store</h1>

      <div className='form-item'>
        <label>Name</label>
        <input
          value={newStore.name}
          onChange={(e) =>
            setNewStore((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Description</label>
        <textarea
          value={newStore.description}
          onChange={(e) =>
            setNewStore((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className='form-item'>
        <label>Type</label>
        <input
          value={newStore.type}
          onChange={(e) =>
            setNewStore((prev) => ({ ...prev, type: e.target.value }))
          }
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Profile Image</label>
        <input
          onChange={(e) => {
            console.log(e.target.files[0]);
            return setNewStore((prev) => ({
              ...prev,
              store_img_url: e.target.files[0],
            }));
          }}
          type='file'
          accept={'image/*'}
        />
      </div>

      <div className='form-item'>
        <label>Banner Image</label>
        <input
          value={newStore.store_banner_url}
          onChange={(e) => {
            setNewStore((prev) => ({
              ...prev,
              store_banner_url: e.target.value,
            }));
          }}
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

export default CreateAStoreForm;
