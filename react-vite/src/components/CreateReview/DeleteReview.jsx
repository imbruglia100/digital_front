import { useDispatch } from "react-redux"
import { deleteStoreReview, getSelectedStore } from "../../redux/stores"
import { useModal } from "../../context/Modal"
import { useEffect } from "react"

const DeleteReview = ({review}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteStoreReview(+review.id))
        await dispatch(getSelectedStore(+review.store_id));
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Delete Product</h2>
            <p>You are about to delete this review. Are you sure?</p>
            <div>
            <button className="primary-btn delete-btn" onClick={handleDelete}>Delete</button>
            <button className="primary-btn edit-btn" onClick={closeModal}>Exit</button>

            </div>
        </div>
    )
}

export default DeleteReview
