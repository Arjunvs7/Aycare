// import React, { useCallback, useContext } from 'react'
// import './ProductDisplay.css'
// import star_icon from '../Assets/star_icon.png'
// import star_dull_icon from '../Assets/star_dull_icon.png'
// import { ShopContext } from '../../Context/ShopContext'


// const ProductDisplay = (props) => {

//     const  {product} = props;
//     const {addToCart}= useContext(ShopContext);
      
//   return (
//     <div className='productdisplay'>
//         <div className="productdisplay-left">
//         <div className="productdisplay-img-list">
//             <img src={product.image} alt=''/>
//             <img src={product.image} alt=''/>
//             {/* <img src={product.image} alt=''/>
//             <img src={product.image} alt=''/> */}
//         </div>
//         <div className="productdisplay-img">
//             <img className='productdisplay-main-img' src={product.image} alt="" />
//         </div>
//         </div>
//         <div className="productdisplay-right">
//            <h1>{product.name}</h1> 
//            <div className="productdisplay-right-stars">
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <img src={star_icon} alt="" />
//             <img src={star_dull_icon} alt="" />
//             <p>(122)</p> #no of ratings
//            </div>
//            <div className="productdisplay-right-prices">
//             <div className="productdisplay-right-price-old">${product.old_price}</div>
//             <div className="productdisplay-right-price-new">${product.new_price}</div>
//            </div>
//            <div className="productdisplay-right-description">
//             description of product 
//            </div>
//            <div className="productdisplay-right-size">
//             {/* <h1>Select size</h1>
//             <div className="productdisplay-right-sizes">
//                 <div>S</div>
//                 <div>M</div>
//                 <div>L</div>
//                 <div>XL</div>
//                 <div>XXL</div>
//             </div> */}
//            </div>
//            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
//             <p className='productdisplay-right category'><span>Category :</span>Spices ,health</p>
//             {/* <p className='productdisplay-right Tags'><span>Category :</span>Spices ,health</p> */}

//         </div>
//     </div>
//   )
// }

// export default ProductDisplay

import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Check if product is undefined or null
  if (!product) {
    return <div>Loading...</div>; // Optionally display a loading message
  }

  // Log the product ID for debugging
  console.log('Product ID:', product.id);

  // Check if product.id exists and is valid
  if (!product.id) {
    return <div>Product ID is missing</div>; // Fallback message if product ID is not found
  }

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* Check if product.image exists */}
          <img src={product.image || '/path/to/default-image.jpg'} alt='' />
          <img src={product.image || '/path/to/default-image.jpg'} alt='' />
        </div>
        <div className="productdisplay-img">
          {/* Check if product.image exists */}
          <img className='productdisplay-main-img' src={product.image || '/path/to/default-image.jpg'} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name || 'Product Name'}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122) {/* Number of ratings */}</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price || '0.00'}</div>
          <div className="productdisplay-right-price-new">${product.new_price || '0.00'}</div>
        </div>
        <div className="productdisplay-right-description">
          {product.description || 'No description available'}
        </div>
        <div className="productdisplay-right-size">
          {/* Size options */}
        </div>
        <button onClick={() => { 
          console.log('Button clicked for product ID:', product.id); 
          addToCart(product.id);  // Adding item to cart with the product ID
        }}>
          ADD TO CART
        </button>
        <p className='productdisplay-right category'>
          <span>Category :</span> {product.category || 'Unknown Category'}
        </p>
      </div>
    </div>
  );
};

// Set defaultProps for the component to prevent errors if product is undefined
ProductDisplay.defaultProps = {
  product: {
    id: 'default-id',  // Ensure 'id' is provided
    image: '/path/to/default-image.jpg',
    name: 'Unknown Product',
    old_price: '0.00',
    new_price: '0.00',
    category: 'Unknown Category',
    description: 'No description available',
  },
};

export default ProductDisplay;
