import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Cart = ({className}) => {

    return (
        <div className={className}>
            <FontAwesomeIcon icon={faCartShopping} onClick={() => alert("Feature is in development")} />
        </div>
    )
}

export default Cart
