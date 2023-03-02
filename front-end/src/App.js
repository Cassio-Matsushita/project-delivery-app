import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import Products from './pages/Products';
import './App.css';
import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div className="App">
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />

        <Route exact path="/register" component={ Register } />

        <Route exact path="/customer/products" component={ Products } />
      </Switch>

    </div>
  );
}

export default App;
