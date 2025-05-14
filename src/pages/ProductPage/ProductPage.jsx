import React, { useEffect } from 'react';
import './ProductPage.css';
import ProductCard from '../../components/products/ProductCard';
import useProductStore from '../../data/store';

function ProductPage() {
  const { sortBy, setSortBy, fetchProducts, filteredProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  let sorted = [...filteredProducts()];

  if (sortBy === 'pris-stigande') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'pris-fallande') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'namn-stigande') {
    sorted.sort((a, b) => a.namn.localeCompare(b.namn));
  }

  const kategorier = ['kubb', 'racketspel', 'bollspel', 'övrigt'];

  return (
    <>
      <div className="sort-container">
        <select
          id="sortering"
          className="sort-dropdown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sortera</option>
          <option value="pris-stigande">Pris: lågt till högt</option>
          <option value="pris-fallande">Pris: högt till lågt</option>
          <option value="namn-stigande">Namn: A - Ö</option>
        </select>
      </div>
      <h1 className='product-h1'>PRODUKTER</h1>

      {kategorier.map((kategori) => (
        <section key={kategori} id={kategori} className="category-section">
          <h2 className="category-title">{kategori.toUpperCase()}</h2>
          <div className="product-grid">
            {sorted.filter(p => p.kategori === kategori).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default ProductPage;
