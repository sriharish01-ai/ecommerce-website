import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../Assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  // Fetch all products
  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Remove product by ID
  const removeProduct = async (id) => {
    try {
      const res = await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Product Removed");
        fetchInfo(); // refresh list
      } else {
        alert("❌ Failed to remove product");
      }
    } catch (err) {
      console.error("Error removing product:", err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img 
              className='listproduct-remove-icon' 
              src={cross_icon} 
              alt="Remove" 
              onClick={() => removeProduct(product.id)} // 👈 hook into API
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
