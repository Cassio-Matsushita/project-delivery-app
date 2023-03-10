import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default function CustomerOrders({ history }) {
  return (
    <div>
      <Header history={ history } />
      <h1>CUSTOMER ORDERS</h1>
    </div>
  );
}

CustomerOrders.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
