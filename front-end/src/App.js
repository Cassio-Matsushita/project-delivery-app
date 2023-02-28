import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div className="App">
      {/* <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object> */}

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/login" component={ Login } />
      </Switch>

    </div>
  );
}

export default App;
