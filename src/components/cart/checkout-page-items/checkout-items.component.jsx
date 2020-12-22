import React from 'react';
import { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../../redux/cart/cart.actions';

import './checkout-items.styles.css';

function CheckoutItems({ cartItem, clearItem, addItem, removeItem }) {
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
                        <span className='arrow' onClick={() => removeItem(cartItem)}> 
                            &#10094;
                        </span>
                        <strong>{quantity}</strong>
                        <span className='arrow' onClick={() => addItem(cartItem)}>
                            &#10095;
                        </span>
                    </div>
                </div>
                <button onClick ={() => clearItem(cartItem)}>Remove From Basket</button>
            </div>

        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
  });

export default connect(null, mapDispatchToProps)(CheckoutItems);
