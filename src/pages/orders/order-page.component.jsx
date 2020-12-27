import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';


import { createStructuredSelector } from 'reselect';

import { firestore } from '../../firebase/firebase-config';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selector';

import Order from '../../components/orders/order.component';

import './order-page.styles.css';

function OrderPage({ cartItems, currentUser }) {
    const [orders, setOrders] = useState([]);
   
   useEffect(() => {
    if(currentUser) {
        firestore
        .collection('users')
        .doc(currentUser?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))

        ))
        console.log(orders)
    } else {
        setOrders([])
    }

  }, [currentUser])
    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className="orders__order">
                {
         
                  orders?.map(order => (
                        <Order order={order} />
                    ))
                 
                }
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    currentUser: selectCurrentUser
  });



export default connect(mapStateToProps)(OrderPage);
