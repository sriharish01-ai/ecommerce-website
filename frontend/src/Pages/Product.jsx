import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { Description } from '../Components/Descriptionbox/Description';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {
  const {all_product}= useContext(ShopContext);
  // const { productId } = useParams(); 
  const params = useParams();
  let productId = params.productId;
  console.log("params", productId)
  // let ProductId = 1;
  const product =all_product.find((e)=>e.id === Number(productId));
  if(!product){
    return <div>Product not found</div>
  }

  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <Description/>
      <RelatedProducts/>
    </div>
  )
}
