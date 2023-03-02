import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function Header() {
  // const logoff = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('role');
  //   setLogin(false);
  //   <Redirect to="/login" />
  // };

  return (
    <header>
      <h1 data-testid="customer_products__element-navbar-link-products">PRODUTOS</h1>
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to="/orders"
      >
        Pedidos
      </Link>
      <h2 data-testid="customer_products__element-navbar-user-full-name">
        LaLaLa
      </h2>
      <Link
        data-testid="customer_products__element-navbar-link-logout"
        to="/login"
      >
        Sair
      </Link>
    </header>
  );
}

// Header.propTypes = {
//   page: PropTypes.string.isRequired,
//   FirstNavigationLink: PropTypes.elementType.isRequired,
//   SecondNavegationLink: PropTypes.elementType,
//   logged: PropTypes.bool,
//   setLogin: PropTypes.func,
// };
