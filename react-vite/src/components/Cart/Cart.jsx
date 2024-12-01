import { faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import './Cart.css'
import { useSelector, useDispatch } from "react-redux"
import { getUserCart, deleteAnItem } from "../../redux/cart"

const CartItem = ({ prod }) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1)

    const increaseAmount = (e) => {
        amount < 10 && setAmount(amount + 1)
    }

    const decreaseAmount = (e) => {
        amount > 0 && setAmount(amount - 1)
    }

    const handleRemove = () => {
        dispatch(deleteAnItem(prod.id));
    }

    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <p id="prod-title">{prod.title}</p>
                <p id="prod-price">${prod.price}</p>
            </div>

            <div className="increment-container">
                <FontAwesomeIcon onClick={decreaseAmount} className="increment-btn" icon={faMinus} />
                <input value={amount} readOnly />
                <FontAwesomeIcon onClick={increaseAmount} className="increment-btn" icon={faPlus} />
            </div>
            <button onClick={handleRemove}>Remove</button>
        </div>)
}

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const [isVisible, setIsVisible] = useState(false)
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
        setIsVisible(!isVisible);
    };

    useEffect(() => {
        if (!isVisible) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [isVisible]);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    return (
        <div className="cart-container">
            <FontAwesomeIcon className="navlink" icon={faCartShopping} onClick={toggleMenu} />
            <div className={`cart ${!isVisible && 'hidden'}`} ref={ulRef}>
                <h2>Cart</h2>
                {
                    Object.keys(cartItems).length <= 1 ?
                        <p className="empty-cart-message">No items in cart</p> :
                        Object.entries(cartItems)
                            .filter(([key, item]) => key !== 'isLoading')
                            .map(([key, item]) => (
                                <CartItem key={item.id} prod={item} />
                            ))
                }
                <button className="primary-btn">Checkout</button>
            </div>
        </div>
    )
}

export default Cart
