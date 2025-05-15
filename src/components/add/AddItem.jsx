import React, { useRef } from 'react';
import { productSchema } from '../../data/validation.js';
import './AddItem.css';

function AddItem({ form, setForm, onSave, isEditing, setEditItem, setError, setSuccess, error = {}, success }) {
  const formRef = useRef(null);


  const handleChange = (e) => {
    //Hämtar sökfältets namn & värde 
    const { name, value } = e.target;
  
    //Skapar en ny kopia av form-objektet, beroende på de fält som uppdaterats via [name]
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  
    //"nytt schema" endast för validering av namn(extract) och jämför (validate) det som skrivs i input 
    const singleField = productSchema.extract(name).validate(value);
  
    setError((prevErrors) => {
      //Kopierar gamla fel (för att inte ändra direkt)
      const newErrors = { ...prevErrors };
      if (!singleField.error) { //Om inget fel hittades, ta bort felet för det här fältet.
        delete newErrors[name]; 
      } else {
        newErrors[name] = singleField.error.message;
      }
      return newErrors;
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = productSchema.validate(form, { abortEarly: false });

    if (result.error) {
      const fieldErrors = {};
      result.error.details.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setError(fieldErrors);
      setSuccess('');
      return;
    }

    setError({});
    onSave(form);
  };

  const handleCancel = () => {
    setEditItem(null);
    setForm({ img: '', namn: '', info: '', price: '', kategori: '' });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="add-form">
      <h3 className='form-h2'>{isEditing ? 'Redigera produkt' : 'Lägg till ny produkt'}</h3>

      <div className="form-group">
        <label>Bildlänk:</label>
        <input
          name="img"
          placeholder="https://..."
          value={form.img}
          onChange={handleChange}
          className={error.img ? 'error-border' : ''}
        />
        {error.img && <p className="error">{error.img}</p>}
      </div>

      <div className="form-group">
        <label>Namn:</label>
        <input
          name="namn"
          placeholder="Produktnamn"
          value={form.namn}
          onChange={handleChange}
          className={error.namn ? 'error-border' : ''}
        />
        {error.namn && <p className="error">{error.namn}</p>}
      </div>

      <div className="form-group">
        <label>Beskrivning:</label>
        <textarea
          name="info"
          placeholder="Minst 15 tecken"
          value={form.info}
          onChange={handleChange}
          className={error.info ? 'error-border' : ''}
        />
        {error.info && <p className="error">{error.info}</p>}
      </div>

      <div className="form-group">
        <label>Pris:</label>
        <input
          name="price"
          type="number"
          placeholder="Pris"
          value={form.price}
          onChange={handleChange}
          className={error.price ? 'error-border' : ''}
        />
        {error.price && <p className="error">{error.price}</p>}
      </div>

      <div className="form-group">
        <label>Kategori:</label>
        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className={error.kategori ? 'error-border' : ''}
        >
          <option value="">Välj kategori</option>
          <option value="kubb">Kubb</option>
          <option value="racketspel">Racketspel</option>
          <option value="bollspel">Bollspel</option>
          <option value="övrigt">Övrigt</option>
        </select>
        {error.kategori && <p className="error">{error.kategori}</p>}
      </div>

      {success && <p className="success">{success}</p>}

      <div className="edit-buttons">
        <button type="submit">{isEditing ? 'Spara ändringar' : 'Lägg till'}</button>
        <button type="button" onClick={handleCancel}>Avbryt</button>
      </div>
    </form>
  );
}

export default AddItem;
