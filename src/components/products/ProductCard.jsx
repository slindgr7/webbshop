import useProductStore from '../../data/store.js';
import { useEffect } from 'react';
import './ProductCard.css';

function ProductCard() {
  const { products, fetchProducts, addToCart } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>PRODUKTER</h2>
      {products.map((p) => (
        <div className='product-container' key={p.id}>
          <img src={p.img} alt={p.namn} className='product-img' />
          <h3>{p.namn}</h3>
          <p>{p.info}</p>
          <p>{p.price}:-</p>
          <button onClick={() => addToCart(p)}>Lägg till i varukorgen</button>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
