/** @format */

import { useDispatch, useSelector } from "react-redux";
import "../CreateAStore/CreateAStoreForm.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { editAStore } from "../../redux/stores";

const EditAStore = () => {
  const user = useSelector((state) => state.session.user);
  const store = useSelector((state) => state.stores.selectedStore);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedStore, setUpdatedStore] = useState({
    id: store?.id,
    owner_id: user?.id,
    name: store?.name,
    description: store?.description,
    type: store?.type,
    store_img_url: store?.store_img_url,
    store_banner_url: store?.store_banner_url,
  });

  const [storeImgFile, setStoreImgFile] = useState(null);
  const [storeBannerFile, setStoreBannerFile] = useState(null);

  useEffect(() => {
    setUpdatedStore({
      ...store,
      owner_id: user?.id,
      name: store?.name,
      description: store?.description,
      type: store?.type,
      store_img_url: store?.store_img_url,
      store_banner_url: store.store_banner_url,
    });
  }, [store, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(updatedStore).forEach(key => {
      formData.append(key, updatedStore[key]);
    });

    if (storeImgFile) {
      formData.append("store_img_url", storeImgFile);
    }
    if (storeBannerFile) {
      formData.append("store_banner_url", storeBannerFile);
    }
    console.log('Submitting form data:', Object.fromEntries(formData));
    await dispatch(editAStore(formData));
    navigate(`/stores/${storeId}`);
  };

  return user ? (
    <form action='POST' onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Create Your Store</h1>

      <div className='form-item'>
        <label>Name</label>
        <input
          value={updatedStore.name}
          onChange={(e) =>
            setUpdatedStore((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Description</label>
        <textarea
          value={updatedStore.description}
          onChange={(e) =>
            setUpdatedStore((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <div className='form-item'>
        <label>Type</label>
        <input
          value={updatedStore.type}
          onChange={(e) =>
            setUpdatedStore((prev) => ({ ...prev, type: e.target.value }))
          }
          required
          type='text'
        />
      </div>

      <div className='form-item'>
        <label>Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setStoreImgFile(e.target.files[0])}
        />
      </div>

      <div className='form-item'>
        <label>Banner Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setStoreBannerFile(e.target.files[0])}
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

export default EditAStore;
