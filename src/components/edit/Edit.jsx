import React, { useState, useEffect, useRef } from 'react';
import useProductStore from '../../data/store.js';
import { useNavigate } from 'react-router';
import AddItem from '../add/AddItem.jsx';
import './Edit.css';

function Edit() {
  const { products, fetchProducts, addProduct, deleteProduct, updateProduct } = useProductStore();
  const [form, setForm] = useState({ img: '', namn: '', info: '', price: '', kategori: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setSuccess("Du har loggats ut.");
    setError("");
    navigate("/");
  };

  const handleSave = async (data) => {
    const payload = { ...data, price: Number(data.price) };

    if (editItem) {
      await updateProduct(editItem.id, payload);
      setSuccess("Produkt uppdaterad!");
    } else {
      await addProduct(payload);
      setSuccess("Produkt tillagd!");
    }

    setEditItem(null);
    setForm({ img: '', namn: '', info: '', price: '', kategori: '' });
    setError('');
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditItem(product);
    setForm({
      img: product.img,
      namn: product.namn,
      info: product.info,
      price: product.price,
      kategori: product.kategori,
    });

    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="edit-container">
      <h1>Redigera produkter</h1>

      {localStorage.getItem("isLoggedIn") === "true" && (
        <button type="button" className="logout-btn" onClick={handleLogout}>Logga ut</button>
      )}

      <div ref={formRef}>
        <AddItem
          form={form}
          setForm={setForm}
          onSave={handleSave}
          isEditing={!!editItem}
          setEditItem={setEditItem}
          setError={setError}
          setSuccess={setSuccess}
          error={error}
          success={success}
        />
      </div>

        <div className="product-list">
          {products.map((p) => (
            <div key={p.id} className="product-item">
              <img src={p.img} alt={p.namn} />
              <h2>{p.namn}</h2>
              <p>Kategori: {p.kategori}</p>
              <p>{p.info}</p>
              <p>{p.price} :-</p>
              <section className='edit-btn' >
              <button onClick={() => handleEdit(p)}>Ändra</button>
              <button onClick={() => deleteProduct(p.id)}>Ta bort</button>
              </section>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Edit;
