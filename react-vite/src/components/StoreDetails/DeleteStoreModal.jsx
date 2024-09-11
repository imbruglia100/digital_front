import { useDispatch } from "react-redux"
import { deleteAStore } from "../../redux/stores"
import { useModal } from "../../context/Modal"
import './StoreDetails.css'
import { useNavigate } from "react-router-dom"

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
        <div className="delete-modal">
            <h2>Delete Store</h2>
            <p>You are about to delete the entire store and all it&apos;s products. Are you sure?</p>

            <div>
            <button className="primary-btn delete-btn" onClick={handleDelete}>Delete</button>
            <button className="primary-btn edit-btn" onClick={closeModal}>Exit</button>

            </div>
        </div>
    )
}

export default DeleteStoreModal;
