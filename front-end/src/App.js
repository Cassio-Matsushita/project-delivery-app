import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import SellerOrders from './pages/SellerOrders';
import OrderDetails from './pages/OrderDetails';
import ManageUsers from './pages/ManageUsers';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <div className="App">
      {/* <span className="logo">TRYBE</span> */}
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/customer/orders/:id" component={ CustomerOrders } />
        <Route exact path="/seller/orders" component={ SellerOrders } />
        <Route exact path="/seller/orders/:id" component={ OrderDetails } />
        <Route exact path="/admin/manage" component={ ManageUsers } />
      </Switch>
    </div>
  );
}

export default App;
