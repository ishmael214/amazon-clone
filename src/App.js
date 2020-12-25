import React from 'react';
import {Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout-page.component';
import LoginPage from './pages/login-register/login.component';
import RegisterPage from './pages/login-register/register.component';
import PaymentPage from './pages/payment/payment-page.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { auth, createUserProfileDocument } from './firebase/firebase-config';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render () {
  return (
    // BEM (really nice styling apparently)
      <div>
        <Header />
        <Switch>
        <Route
            exact
            path='/login'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <LoginPage />
              )
            }
          />
        <Route
            exact
            path='/register'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <RegisterPage />
              )
            }
          />
          <Route path='/checkout' component= {CheckoutPage} />
          <Route path='/payment' component= {PaymentPage} />
          <Route path='/' component= {Homepage}  />
        </Switch>
      </div>    
    );
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
