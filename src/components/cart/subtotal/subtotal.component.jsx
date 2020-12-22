import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CurrencyFormat from 'react-currency-format';

import './subtotal.styles.css'

import { selectCartItemsCount, selectCartTotal } from '../../../redux/cart/cart.selector';

function Subtotal({ itemCount, total }) {
    return <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({itemCount} items): <strong>{total}</strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type='checkbox' />
                            This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={0}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'E'}
            />

            <button>Proceed to Checkout</button>
        </div>
    
};

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
    total: selectCartTotal
  });

export default connect(mapStateToProps)(Subtotal);
