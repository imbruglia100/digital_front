import { useDispatch } from "react-redux"
import { deleteAStore } from "../../redux/stores"
import { useModal } from "../../context/Modal"
import './StoreDetails.css'
import { Navigate, useNavigate } from "react-router-dom"

const DeleteStoreModal = ({storeId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteAStore(+storeId))


        closeModal()
        return navigate('/stores/current')



    }
    return (
        <div>
            <h2>Delete Store</h2>
            <p>You are about to delete the entire store and all it's products. Are you sure?</p>
            <button className="primary-btn delete-btn" onClick={handleDelete}>Delete</button>
            <button className="primary-btn edit-btn" onClick={closeModal}>Exit</button>
        </div>
    )
}

export default DeleteStoreModal;
