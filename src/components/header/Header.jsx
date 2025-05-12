import './Header.css'
import React from 'react'
import Cart from '../cart/Cart.jsx'
import cartImg from '../../assets/cart.png'
import searchImg from '../../assets/search.png'
import useProductStore from '../../data/store.js'
import { useCartStore } from '../../data/cartStore.js'




function Header() {

  const toggleCart = useCartStore((state) => state.toggleCart);
  const orderedItems = useProductStore((state) => state.orderedItems);
  const totalQuantity = orderedItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <>
      <header  className='header-container'>
        <section className='header-top'>
        <h1>FUN&GAMES</h1>
        {totalQuantity > 0 && (
          <span className="cart-count">{totalQuantity}</span>
        )}
        <img
            className='cart-img'
            src={cartImg}
            alt="kundvagn"
            onClick={toggleCart}
          />
        </section>
        <section className='header-middle'>
          <p>KUBB</p>
          <p>RACKETSPEL</p>
          <p>BOLLSPEL</p>
          <p>ÖVRIGT</p>
          <img className='search-img' src={searchImg} alt="förstoringsglas" />
        </section>
        {/* <section>
          <p>it's all fun and game, until......</p>
        </section> */}
      </header>
      <Cart />
    </>
  )
}

export default Header
