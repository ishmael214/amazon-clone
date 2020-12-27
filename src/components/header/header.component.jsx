import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase-config';

import './header.styles.css'

import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { selectCartItemsCount } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ itemCount, currentUser }) => {
    return (
        <div className='header'>
            <Link to='/'>
                <img className='header__logo'
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt='amazon logo'
                />
            </Link>

            <div className='header__search'>
                <input className='header__searchInput type='text />
                <SearchIcon className='header__searchIcon' />
            </div>

            <div className='header__nav'>
                <Link to='/login' >
                    <div className='header__option'>
                        { currentUser ? 
                        (<>
                            
                            <span className='header__optionLineOne' onClick={() => auth.signOut()}>
                            Hello, {currentUser.displayName}
                            </span>
                            <span className='header__optionLineTwo' onClick={() => auth.signOut()}>
                            Sign Out
                            </span>
                        </>) : ( <> 
                            <span className='header__optionLineOne'>
                                Hello Guest
                            </span>
                            <span className='header__optionLineTwo'>
                                Sign In
                            </span>
                        </>)  
                    }
                        
                    </div>
                </Link>
                
                <Link to ='/orders'>
                    <div className='header__option'>
                        <span className='header__optionLineOne'>
                            Returns
                        </span>
                        <span className='header__optionLineTwo'>
                            & Orders
                        </span>
                    </div>
                </Link>

                <div className='header__option'>
                    <span className='header__optionLineOne'>
                        Your
                    </span>
                    <span className='header__optionLineTwo'>
                        Prime
                    </span>
                </div>
                <Link to='/checkout'>
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className='header__optionLineTwo header__basketCount'>{ itemCount }</span>
                    </div>
                </Link>

            </div>

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
    currentUser: selectCurrentUser
  });
  
  export default connect(mapStateToProps)(Header);
