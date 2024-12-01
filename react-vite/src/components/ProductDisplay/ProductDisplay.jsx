import AddToCart from '../AddToCart/AddToCart';

const ProductDisplay = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <AddToCart productId={product.id} />
        </div>
    );
};

export default ProductDisplay; 
