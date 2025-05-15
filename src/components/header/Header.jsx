import './Header.css';
import React, { useState } from 'react';
import Cart from '../cart/Cart.jsx';
import cartImg from '../../assets/cart.png';
import searchImg from '../../assets/search.png';
import useProductStore from '../../data/store.js';
import { useCartStore } from '../../data/cartStore.js';
import heroImg from '../../assets/hero-img.jpg';
import { HashLink } from 'react-router-hash-link';
import adminImg from '../../assets/admin.png';

function Header() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const orderedItems = useProductStore((state) => state.orderedItems);
  const totalQuantity = orderedItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateSearchText = useProductStore((state) => state.updateSearchText);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className='header-container'>
        <section className='header-top'>
          <a href="/">FUN&GAMES.</a>
        </section>

        <section className='header-middle'>
          <HashLink className='navbar' smooth to="#kubb">KUBB</HashLink>
          <HashLink className='navbar' smooth to="#racketspel">RACKETSPEL</HashLink>
          <HashLink className='navbar' smooth to="#bollspel">BOLLSPEL</HashLink>
          <HashLink className='navbar' smooth to="#övrigt">ÖVRIGT</HashLink>
        </section>

        <section className='cart-admin-section'>
          <div className="cart-img-wrapper">
            {totalQuantity > 0 && (
              <span className="cart-count">{totalQuantity}</span>
            )}
            <img
              className='cart-img'
              src={cartImg}
              alt="kundvagn"
              onClick={toggleCart}
            />
          </div>
          <HashLink to="/signin">
            <img className='admin' src={adminImg} alt="admin-ikon" />
          </HashLink>
        </section>
      </header>
      
      <section className='img-search-section' >
        <img className='hero-img' src={heroImg} alt="" />
        
        <p className='slogan' >it's all fun&games until.....</p>

        <p className='search' onClick={() => setShowSearch(prev => !prev)}>
            sök..
        </p>
          
        

        {showSearch && (
          <input
            className="search-input"
            type="text"
            placeholder="Sök"
            onChange={(e) => updateSearchText(e.target.value)}
            autoFocus
            onBlur={() => setShowSearch(false)}
          />

        )}
      </section>
      <Cart />
    </>
  );
}

export default Header;
