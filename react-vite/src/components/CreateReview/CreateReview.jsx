
import { useState } from "react";
import "./CreateReview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addNewStoreReview } from "../../redux/stores";
const CreateReview = ({store_id}) => {
  const dispatch = useDispatch()
  const user = useSelector(state=>state.session.user)
  const [formData, setFormData] = useState({
    user_id: user.id,
    store_id: store_id,
    title: "",
    rating: 1,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault()



    dispatch(addNewStoreReview(formData))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a review</h1>
      <div className='form-item'>
        <label>Title</label>
        <input type='text' required />
      </div>

      <div className='form-item'>
        <label>Rating</label>
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
        <label>Description</label>
        <textarea />
      </div>

      <button className='primary-btn'>Create</button>
    </form>
  );
};

export default CreateReview;
