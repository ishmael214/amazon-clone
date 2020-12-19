import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout-page.component';

function App() {
  return (
    // BEM (really nice styling apparently)
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path='/checkout'>
            <CheckoutPage />
          </Route>
          
          <Route path='/'>
            <Homepage />  
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
