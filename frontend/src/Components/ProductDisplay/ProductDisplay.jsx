import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../Context/ShopContext";


 export const ProductDisplay = ({ product }) => {
     
     const {addTocart}=useContext(ShopContext);

  return (
    <div className="product-display">
      {/* Left thumbnails */}
      <div className="product-thumbnails">
        <img src={product.image} alt={product.name} />
        <img src={product.image} alt={product.name} />
        <img src={product.image} alt={product.name} />
        <img src={product.image} alt={product.name} />
      </div>

      {/* Main image */}
      <div className="product-main-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Right product details */}
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-category">Category: {product.category}</p>

        <div className="product-price">
          <span className="old-price">₹{product.old_price}</span>
          <span className="new-price">₹{product.new_price}</span>
          <span className="discount">
            {Math.round(
              ((product.old_price - product.new_price) / product.old_price) * 100
            )}
            % Off
          </span>
          <div className="product-right-des">
            <p>A lightweight usually knitted pullover shirt close fitting with round neckline</p>
          </div>
        </div>
        <div className="productdiplay-right-sizes">
          <h1>Select size</h1>
          <div className="productsdiplay-right-sizes">
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXL</div>
          </div>

        </div>
        <p className="productdiplay-right-category"><span>Category:</span>Women,T-shirt</p>
        <p className="productdiplay-right-category"><span>Category:</span>Modern,Latest</p>
        

        <button onClick={()=>{console.log("Add to cart is clicked");addTocart(product.id)}} className="buy-btn">Add to Cart</button>
        <button className="buy-btn buy-now">Buy Now</button>

      </div>
    </div>
  );
};






