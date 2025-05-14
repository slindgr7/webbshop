import React, { useRef } from 'react';
import { productSchema } from '../../data/validation.js';
import './AddItem.css';

function AddItem({ form, setForm, onSave, isEditing, setEditItem, setError, setSuccess, error, success }) {
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { error } = productSchema.validate(form);
    if (error) {
      setError(error.details[0].message);
      setSuccess('');
      return;
    }

    onSave(form);
  };

  const handleCancel = () => {
    setEditItem(null);
    setForm({ img: '', namn: '', info: '', price: '', kategori: '' });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="add-form">
      <h3>{isEditing ? 'Redigera produkt' : 'Lägg till ny produkt'}</h3>

      <div className="form-group">
        <label>Bildlänk:</label>
        <input name="img" placeholder="https://..." value={form.img} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Namn:</label>
        <input name="namn" placeholder="Produktnamn" value={form.namn} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Beskrivning:</label>
        <textarea name="info" placeholder="Minst 15 tecken" value={form.info} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Pris:</label>
        <input name="price" type="number" placeholder="Pris" value={form.price} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Kategori:</label>
        <select name="kategori" value={form.kategori} onChange={handleChange}>
          <option value="">Välj kategori</option>
          <option value="kubb">Kubb</option>
          <option value="racketspel">Racketspel</option>
          <option value="bollspel">Bollspel</option>
          <option value="övrigt">Övrigt</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="edit-buttons">
        <button type="submit">{isEditing ? 'Spara ändringar' : 'Lägg till'}</button>
        <button type="button" onClick={handleCancel}>Avbryt</button>
      </div>
    </form>
  );
}

export default AddItem;
