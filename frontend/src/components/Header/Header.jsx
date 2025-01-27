// /* eslint-disable no-unused-vars */
// import React from 'react'
// import './Header.css'
// const Header = () => {
//   return (
//     <div className='header'>
//       <div className="header-contents">
//         <h2>Order your favourite food here</h2>
//         <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.Our mission is to satisfy cravings and elevate your dining experience,one delicious meal at a time.</p>
//         <button>View More</button>
//       </div>
//     </div>
//   )
// }

// export default Header
import React from "react";
import "./Header.css";

const Header = () => {
  const avatarImage =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200";
  
  return (
    <div className="yoyo">
      <div className="hero-section">
        <div className="hero-left">
          <div className="explore-tag">
            <span>Explore the world of food 🍲</span>
          </div>
          <h1>
            <span>Crave it?</span>
            <br />
            Click it.
            <br />
            <span className="repeat">Eat it.</span>Repeat.
          </h1>
          <p>
            Discover the flavors of the world, and you'll be amazed by the
            delicious experiences waiting at your doorstep.
          </p>
          <div className="cta-buttons">
            <button className="plan-trip-btn">View more</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-image"></div>
          {/* <div className="activities-card">
            <h3>Why you are most excited ?</h3>
            <div className="activity">
              <span className="activity-icon">🏃</span>
              <div>
                <h4>Hiking</h4>
                <p>Climbing the tallest mountain</p>
              </div>
            </div>
            <div className="activity">
              <span className="activity-icon">🏄</span>
              <div>
                <h4>Surfing</h4>
                <p>Surfing is the next best thing to have</p>
              </div>
            </div>
            <div className="activity">
              <span className="activity-icon">🪂</span>
              <div>
                <h4>Parachuting</h4>
                <p>It feels more like flying than falling</p>
              </div>
            </div>
          </div> */}
          <div className="food-delivery-card">
            <h3>What makes us special?</h3>

            <div className="feature">
              <span className="feature-icon">🍕</span>
              <div>
                <h4>Wide Variety</h4>
                <p>Explore cuisines from around the world</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon">🚀</span>
              <div>
                <h4>Fast Delivery</h4>
                <p>Get your food delivered in record time</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon">🎁</span>
              <div>
                <h4>Exclusive Deals</h4>
                <p>Enjoy discounts and special offers</p>
              </div>
            </div>

            <div className="feature">
              <span className="feature-icon">🌟</span>
              <div>
                <h4>Top-rated Restaurants</h4>
                <p>Order from the best-rated places in town</p>
              </div>
            </div>
          </div>
          <div className="review-card">
            <img src={avatarImage} alt="Reviewer" className="reviewer-avatar" />
            <div className="review-content">
              <p>very good service</p>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
