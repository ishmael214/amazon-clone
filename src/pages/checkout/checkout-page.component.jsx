import React from 'react'

import './checkout-page.styles.css'

import Subtotal from '../../components/cart/subtotal/subtotal.component.jsx';

function CheckoutPage() {
    return (
        <div className='checkout'>
            <div className="checkout__left">
                <img className='checkout__ad' 
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="banner ad"
                />

                <div>
                    <h2 className="checkout__title">
                        {/*Basket ITEM */}
                    </h2>
                </div>

            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>

        </div>
    )
}

export default CheckoutPage;
