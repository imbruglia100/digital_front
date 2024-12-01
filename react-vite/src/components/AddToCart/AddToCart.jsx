import { useDispatch } from 'react-redux';
import { addToCart, getUserCart } from '../../redux/cart';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import './AddToCart.css';

const AddToCart = ({ productId, quantity = 1 }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await dispatch(addToCart(productId, quantity));
            if (response?.errors) {
                setError(response.errors);
            } else {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError(['An unexpected error occurred']);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getUserCart())
    }, [dispatch])

    return (
        <div className="add-to-cart-wrapper">
            <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className={`add-to-cart-btn ${success ? 'success' : ''} ${error ? 'error' : ''}`}
            >
                <FontAwesomeIcon icon={faCartPlus} />
                {isLoading ? 'Adding...' : success ? 'Added!' : 'Add to Cart'}
            </button>
            {error && <div className="error-message">{error.join(', ')}</div>}
        </div>
    );
};

export default AddToCart;
