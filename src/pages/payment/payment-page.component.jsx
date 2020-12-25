import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItems from '../../components/cart/checkout-page-items/checkout-items.component';

import { selectCartItemsCount, selectCartItems } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selectors';


import './payment-page.styles.css';

function PaymentPage({ cartItems, itemCount, currentUser }) {
    
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to='checkout'>{itemCount} items</Link>
                    )
                </h1>

                {/*PAYMENT SECTION - DELIVERY ADDY*/}
                <div className="payment__section">

                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        { currentUser ? 
                        (<> 
                            <p>{ currentUser.email}</p>
                        </>) : (<> </>)
                        }
                        <p>{/* ADD IN EMAIL*/}</p>
                        <p>123 React Lane</p>
                        <p>Dallas, TX</p>
                    </div>
                </div>

                {/*PAYMENT SECTION - REVIEW ITEMS*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                    {cartItems.map(
                        cartItem => (
                            <CheckoutItems key={cartItem.id} cartItem={cartItem} />
                        )
                    )}
                    </div>
                </div>

                {/*PAYMENT SECTION - PAYMENT METHOD*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/*STRIPE MAGIC*/}
                    </div>
                </div>

            </div>   
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemCount: selectCartItemsCount,
    currentUser: selectCurrentUser
  });

export default connect(mapStateToProps)(PaymentPage);
