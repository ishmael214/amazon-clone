import React from 'react'


import '../../components/cart/checkout-page-items/checkout-items.styles.css';

function OrderItems({ cartItem }) {
    const { id, image, price, rating, title, quantity } = cartItem;
   return (
       <div className='checkoutProduct'>
           <img className='checkoutProduct__image' src={image} alt='somethings here'/>

           <div className='checkoutProduct__info'>
               <p className='checkoutProduct__title'>{title}</p>
               <p className='checkoutProduct__price'>
                   <small>$</small>
                   <strong>{price}</strong>
               </p>
               <div className='checkoutProduct__rating'>
                   {
                       Array(rating).fill().map((_, i) => (
                           <p>⭐</p>
                       ))
                   }
               </div>
               <div className='quantity'>
                   <div>
                       <span><strong>Quantity</strong></span>
                       <span className='arrow'> 
                           &#10094;
                       </span>
                       <strong>{quantity}</strong>
                       <span className='arrow'>
                           &#10095;
                       </span>
                   </div>
               </div>
           </div>

       </div>
   )
};

export default OrderItems;
