import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';

function App() {
  return (
    // BEM (really nice styling apparently)
    <div className="app">
      
      <Header />
      <Homepage />
    </div>
  );
}

export default App;
