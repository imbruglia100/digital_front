import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Cart = ({className}) => {

    return (
        <div className={className}>
            <FontAwesomeIcon icon={faCartShopping} />
        </div>
    )
}

export default Cart
