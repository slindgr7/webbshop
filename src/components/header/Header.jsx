import React from 'react'
import './Header.css'



function Header() {
  return (
    <>
      <header  className='header-container'>
        <section className='header-top'>
        <h2>FUN&GAMES</h2>
          <p>Cart</p>
        </section>
        <section className='header-middle'>
          <p>KUBB</p>
          <p>RACKETSPEL</p>
          <p>BOLLSPEL</p>
          <p>ÖVRIGT</p>
        </section>
        {/* <section>
          <p>it's all fun and game, until......</p>
        </section> */}
      </header>
    </>
  )
}

export default Header
