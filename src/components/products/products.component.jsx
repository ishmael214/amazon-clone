import React from 'react'
import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import './products.styles.css';

function Products({ id, title, image, price, rating, addItem  }) {
    return (
        <div className='product'>
            <div className="product__info">
                <p>{ title }</p>
                <p className='product__price'>
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>

                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                        <p>⭐</p>
                    ))}    
                </div>
            </div>
            

            <img 
                src={ image }
                alt="something"
            />

            <button onClick={() => addItem({ id, title, image, price, rating })}>Add  To Basket</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
  });

export default connect(null, mapDispatchToProps)(Products);
