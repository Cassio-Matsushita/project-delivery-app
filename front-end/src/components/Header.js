import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default function Header({ history }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userLocalStorage) setUser(userLocalStorage);
  }, []);

  const handleClick = () => {
    localStorage.removeItem('user');

    history.push('/login');
  };

  return (
    <header>
      <h1 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h1>
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to="/orders"
      >
        Pedidos
      </Link>
      <p data-testid="customer_products__element-navbar-user-full-name">
        { user.name }
      </p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleClick }
      >
        Sair
      </button>
    </header>
  );
}

Header.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
