import './Header.css';
import React, { useState } from 'react';
import Cart from '../cart/Cart.jsx';
import cartImg from '../../assets/cart.png';
import searchImg from '../../assets/search.png';
import useProductStore from '../../data/store.js';
import { useCartStore } from '../../data/cartStore.js';
import heroImg from '../../assets/hero-img.jpg'
import { NavLink } from 'react-router';
import adminImg from '../../assets/admin.png'

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
          <a href="/">fUN&GAMES.</a>
        </section>
        <section className='header-middle'>
          <p>KUBB</p>
          <p>RACKETSPEL</p>
          <p>BOLLSPEL</p>
          <p>ÖVRIGT</p>
        </section>
        <section className='cart-admin-section' >
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
        <NavLink to="/signin">
          <img className='admin' src={adminImg} alt="admin-ikon" />
        </NavLink>
        </section>
      </header>
      <section>
        <img className='hero-img' src={heroImg} alt="" />
        <p>it's all fun&games until.....</p>
        <img
            className='search-img'
            src={searchImg}
            alt="förstoringsglas"
            onClick={() => setShowSearch(prev => !prev)}
          />
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
