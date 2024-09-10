import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import './ProductDetials.css'
import { useNavigate } from "react-router-dom"
import { deleteAProduct } from "../../redux/products"

const DeleteProductModal = ({productId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const navigate = useNavigate()
    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteAProduct(+productId))


        closeModal()
        return navigate('/products/current')



    }
    return (
        <div className="delete-modal">
            <h2>Delete Product</h2>
            <p>You are about to delete this product. Are you sure?</p>
            <div>
            <button className="primary-btn delete-btn" onClick={handleDelete}>Delete</button>
            <button className="primary-btn edit-btn" onClick={closeModal}>Exit</button>

            </div>
        </div>
    )
}

export default DeleteProductModal;
