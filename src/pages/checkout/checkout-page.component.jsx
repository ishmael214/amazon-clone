import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './checkout-page.styles.css'

import { selectCartItems } from '../../redux/cart/cart.selector';

import CheckoutItems from '../../components/cart/checkout-page-items/checkout-items.component';
import Subtotal from '../../components/cart/subtotal/subtotal.component.jsx';

function CheckoutPage({ cartItems }) {
    return (
        <div className='checkout'>
            <div className="checkout__left">
                <img className='checkout__ad' 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="banner ad"
                />

                <div>
                    <h2 className="checkout__title">
                        YOUR SHOPPING CART
                    </h2>
                    {cartItems.map(
                        cartItem => (
                            <CheckoutItems key={cartItem.id} cartItem={cartItem} />
                        )
                    )}
                </div>

            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
  });

export default connect(mapStateToProps)(CheckoutPage);
