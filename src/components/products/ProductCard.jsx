import './ProductCard.css';
import useProductStore from '../../data/store.js';

function ProductCard({ product }) {
  const { addToCart } = useProductStore();

  return (
    <div className="product-container">
      <img src={product.img} alt={product.namn} className="product-img" />
      <h3>{product.namn}</h3>
      <p>{product.info}</p>
      <p>{product.price}:-</p>
      <button onClick={() => addToCart(product)}>Lägg till i varukorgen</button>
    </div>
  );
}

export default ProductCard;
