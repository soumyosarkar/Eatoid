import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium optio voluptatem voluptas, asperiores alias aut voluptates ipsum dicta corrupti a aliquid, deserunt ullam quod at, quae architecto similique numquam commodi?</p>
            <div className='footer-icon'>
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+91-56454564565</li>
                <li>examle@email.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copy">Copyright 2024 grabo.com -All Right Reserved.</p>
    </div>
  )
}

export default Footer
