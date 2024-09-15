/** @format */

import { useDispatch, useSelector } from "react-redux";
import "./CreateAStoreForm.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addNewStore } from "../../redux/stores";

const CreateAStoreForm = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [newStore, setNewStore] = useState({
    owner_id: user?.id,
    name: "",
    description: "",
    type: "",
    store_img_url: "",
    store_banner_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append('owner_id', user?.id)
    formData.append('name', newStore.name)
    formData.append('description', newStore?.description)
    formData.append('type', newStore?.type)
    formData.append('store_img_url', newStore?.store_img_url)
    formData.append('store_banner_url', newStore?.store_banner_url)

    const addedStore = await dispatch(addNewStore(formData));

    if (addedStore?.id) {
      return navigate(`/stores/${addedStore.id}`);
    }
  };

  return user ? (
    <form action='POST' onSubmit={handleSubmit}>
      <h1>Create Your Store</h1>

      <div className='form-item'>
        <label>
          Name<span className='required'>*</span>
        </label>
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
        <label>
          Description<span className='required'>*</span>
        </label>
        <textarea
          required
          value={newStore.description}
          onChange={(e) =>
            setNewStore((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className='form-item'>
        <label>
          Category<span className='required'>*</span>
        </label>
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
        <label>
          Profile Image
        </label>
        <input
          onChange={(e) =>
            setNewStore((prev) => ({ ...prev, store_img_url: e.target.files[0] }))
          }
          accept='.pdf,.png,.jpg,.jpeg'
          type='file'
        />
      </div>

      <div className='form-item'>
        <label>Banner Image</label>
        <input
          onChange={(e) =>
            setNewStore((prev) => ({
              ...prev,
              store_banner_url: e.target.files[0],
            }))
          }
          accept='.pdf,.png,.jpg,.jpeg'
          type='file'
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
