import React from 'react';
import facebookImg  from '../../assets/fb.png'
import instagramImg from '../../assets/insta.png'
import youtubeImg from '../../assets/yt.png'
import phoneImg from '../../assets/phone.png'
import mapImg from '../../assets/map.png'
import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
        <p className="footer-logo">FUN&GAMES</p>

        <section className='footer-info' >
          
          <p>
            <img className="kart-ikon" src={mapImg} alt="kart-ikon" />
            Kungstorget 12
          </p>

          <p>
            <img className="telefon-ikon" src={phoneImg} alt="phone-icon" />
            031 - 46 78 98
          </p>

          <p className='icons' >
            <img src={facebookImg} alt="facebook-ikon" />
            <img src={instagramImg} alt="instagram-ikon" />
            <img src={youtubeImg} alt="youtube-ikon" />
          </p>
        </section>



        <section className='footer-end' >
        <p>© FUN&GAMES {new Date().getFullYear()}</p>
      </section>

    </footer>
  );
}

export default Footer;
