import { faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import './Cart.css'

const CartItem = ({prod}) => {
    const [amount, setAmount] = useState(1)
    const increaseAmount = (e) => {
        amount < 10 && setAmount(amount + 1)
    }

    const decreaseAmount = (e) => {
        amount > 0 && setAmount(amount - 1 )
    }

    return (
    <div className="cart-item">
        <div className="cart-item-info">
            <p id="prod-title">{prod.title}</p>
            <p id="prod-price">${prod.price}</p>
        </div>

        <div className="increment-container">
            <FontAwesomeIcon onClick={decreaseAmount} className="increment-btn" icon={faMinus} />
                <input value={amount} defaultValue={1}/>
            <FontAwesomeIcon onClick={increaseAmount} className="increment-btn" icon={faPlus} />
        </div>
    </div>)
}

const Cart = () => {
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

    return (
        <div className="cart-container">
            <FontAwesomeIcon className="navlink" icon={faCartShopping} onClick={toggleMenu} />
            <div className={`cart ${!isVisible && 'hidden'}`} ref={ulRef}>
                <h2>Cart</h2>
                <CartItem prod={{title: 'Name', price:14.20}} />
                <CartItem prod={{title: 'Name', price:14}} />
                <CartItem prod={{title: 'Name', price:14}} />
                <button className="primary-btn">Checkout</button>
            </div>
        </div>
    )
}

export default Cart
