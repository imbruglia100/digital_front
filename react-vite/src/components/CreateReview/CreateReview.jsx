/** @format */

import { useState } from "react";
import "./CreateReview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addNewStoreReview } from "../../redux/stores";
import { useModal } from "../../context/Modal";
const CreateReview = ({ store_id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    store_id: store_id,
    title: "",
    rating: 1,
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const tempErrors = {};
    formData;
    if (!formData.title) {
      tempErrors.title = "Must have a title";
    }

    if (!formData.description) {
      tempErrors.description = "Must have a description";
    }
    console.log(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      await dispatch(addNewStoreReview(formData));
      closeModal();
      return;
    }

    setErrors(errors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a review</h1>
      <div className='form-item'>
        <label>
          Title <span className='required'>*</span>
        </label>
        <input
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          type='text'
          required
        />
      </div>

      <div className='form-item'>
        <label>
          Rating <span className='required'>*</span>
        </label>
        <div className='stars-container'>
          {[1, 2, 3, 4, 5].map((ele) => (
            <FontAwesomeIcon
              onClick={() => setFormData((prev) => ({ ...prev, rating: ele }))}
              className={`star ${formData.rating >= ele ? "active" : ""}`}
              icon={faStar}
            />
          ))}
        </div>
      </div>

      <div className='form-item'>
        <label>
          Description <span className='required'>*</span>
        </label>
        <textarea
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          value={formData.description}
          required
        />
      </div>

      <button onClick={handleSubmit} className='primary-btn'>
        Create
      </button>
    </form>
  );
};

export default CreateReview;
