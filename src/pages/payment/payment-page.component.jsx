import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';

import { createStructuredSelector } from 'reselect';

import { firestore } from '../../firebase/firebase-config';

import axios from '../../axios';

import CheckoutItems from '../../components/cart/checkout-page-items/checkout-items.component';

import { emptyCart } from '../../redux/cart/cart.actions'
import { selectCartItemsCount, selectCartItems, selectCartTotal } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selectors';


import './payment-page.styles.css';


function PaymentPage({ cartItems, itemCount, currentUser, total, emptyCart }) {
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${total * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [cartItems])

    console.log('WHAT IS LEARNED IN BOATING SCHOOL IS....', clientSecret)

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            firestore.collection('users')
                .doc(currentUser?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    cart: cartItems,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            emptyCart();

            history.replace('/orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

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
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <p>
                                                <h3>Order Total: {value}</h3>
                                            </p>
                                            <small className='subtotal__gift'>
                                                <input type='checkbox' />
                                                This order contains a gift
                                            </small>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={total}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button 
                                disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                            
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>   
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    itemCount: selectCartItemsCount,
    currentUser: selectCurrentUser,
    total: selectCartTotal
  });

  const mapDispatchToProps = dispatch => ({
    emptyCart: () => dispatch(emptyCart())
  });


export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
