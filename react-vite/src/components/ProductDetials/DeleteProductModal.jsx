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
        <div>
            <h2>Delete Store</h2>
            <p>You are about to delete this product. Are you sure?</p>
            <button className="primary-btn delete-btn" onClick={handleDelete}>Delete</button>
            <button className="primary-btn edit-btn" onClick={closeModal}>Exit</button>
        </div>
    )
}

export default DeleteProductModal;
