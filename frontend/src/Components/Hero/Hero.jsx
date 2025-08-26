import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className="hero">
      {/* Left Side */}
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>

        <div className="hero-hand-icon">
          <p>new</p>
          <img src={hand_icon} alt="hand icon" />
        </div>

        <p>collections</p>
        <p>for everyone</p>

        <div className="hero-latest-btn">
          <span>Latest Collection</span>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>

      {/* Right Side */}
      <div className="hero-right">
        <img src={hero_image} alt="hero model" />
      </div>
    </div>
  )
}