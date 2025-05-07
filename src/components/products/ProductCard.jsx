import useProductStore from '../../data/store.js';
import { useEffect } from 'react';
import './ProductCard.css'


function ProductCard() {
	const { products, fetchProducts } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='product-container'>
			<h2>Produkter</h2>
			{products.map((p) => (
				<div key={p.id}>
          <img src={p.img} alt={p.namn} className='product-img'/>
					<h2>{p.namn}</h2>
					<p>{p.info}</p>
          <p>{p.price}:-</p>
				</div>
			))}
		</div>
	);
}

export default ProductCard;