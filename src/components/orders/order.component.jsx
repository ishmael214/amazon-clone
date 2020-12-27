import React from 'react'
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

import { createStructuredSelector } from 'reselect';

import moment from 'moment';

import { selectCartItems, selectCart } from '../../redux/cart/cart.selector';

import OrderItems from '../orders/order-items.component';

import './order.styles.css';

function Order({ order, cartItems, cart }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className='order__id'>
                <small>{order.id}</small>
            </p>
            {order.data.cart.map(
                cartItem => (
                    <OrderItems key={cartItem.id} cartItem={cartItem} />
                )
            )}
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
                value={order.data.amount / 100}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cart: selectCart
  });

export default connect(mapStateToProps)(Order);
