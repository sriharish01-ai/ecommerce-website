import React, { useState } from 'react';
import './Addproduct.css';
import upload_area from '../../Assets/upload_area.svg';

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_product = async () => {
    console.log("Product Details (before upload):", productDetails);

    // Prepare form data
    let formData = new FormData();
    formData.append('product', image);

    let responseData = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData
    }).then((resp) => resp.json());

    if (responseData.success) {
      let product = {
        ...productDetails,
        image: responseData.image_url
      };

      console.log("Final Product with Image URL:", product);

      // Send to backend
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      }).then((resp) => resp.json())
        .then((data) => console.log("Add Product Response:", data));
    }
  };

  return (
    <div className='addproduct'>
      {/* Product title */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input 
          value={productDetails.name} 
          onChange={changeHandler} 
          type="text" 
          name='name' 
          placeholder='Type here' 
        />
      </div>

      {/* Price and Offer price */}
      <div className="addproduct-row">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input 
            value={productDetails.old_price} 
            onChange={changeHandler} 
            type="text" 
            name='old_price' 
            placeholder='Type here' 
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input 
            value={productDetails.new_price} 
            onChange={changeHandler} 
            type="text" 
            name="new_price" 
            placeholder='Type here' 
          />
        </div>
      </div>

      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select 
          value={productDetails.category} 
          onChange={changeHandler} 
          name="category" 
          className='add-product-selector'
        >
          <option value="">Select</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      {/* Upload section */}
      <div className="addproduct-itemfield upload-field">
        <label htmlFor="file-input">
          <img 
            src={image ? URL.createObjectURL(image) : upload_area} 
            className='addproduct-thumbnail-img' 
            alt="Upload" 
          />
        </label>
        <input 
          onChange={imageHandler} 
          type="file" 
          name='image' 
          id='file-input' 
          hidden 
        />
      </div>

      {/* Button */}
      <button onClick={Add_product} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default Addproduct;
