import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import login, { validateUser, setToken } from '../api/fetchApi';

const SIX = 6;

export default function Login({ history }) {
  const [email, setChangeEmail] = useState('');
  const [password, setChangePass] = useState('');
  const [isLogged, setIsLogged] = useState(true);
  const [isBtnDisabled, setisBtnDisabled] = useState(true);

  useEffect(() => {
    const validEmail = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validPassword = password.length >= SIX;
    if (validEmail && validPassword) {
      setisBtnDisabled(false);
    } else {
      setisBtnDisabled(true);
    }
  }, [email, password]);

  const handleClick = async () => {
    try {
      const { data } = await login(email, password);

      setToken(data);
      const { data: { name, email: userEmail, role } } = await validateUser();
      const user = { name, email: userEmail, role, token: data };

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setIsLogged(true);
        if (email === 'adm@deliveryapp.com') {
          return history.push('/admin/manage');
        }
        if (email === 'fulana@deliveryapp.com') {
          return history.push('/seller/orders');
        }
        history.push('/customer/products');
      }
      setIsLogged(false);
    } catch (error) {
      setIsLogged(false);
    }
  };

  return (
    <div>
      <Redirect to="/login" />
      <div>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_login__input-email"
            id="email"
            type="email"
            placeholder="Email"
            onChange={ (e) => setChangeEmail(e.target.value) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_login__input-password"
            id="password"
            type="password"
            placeholder="Senha"
            onChange={ (e) => setChangePass(e.target.value) }
          />
        </label>
      </div>
      <div>
        <button
          data-testid="common_login__button-login"
          type="button"
          disabled={ isBtnDisabled }
          onClick={ handleClick }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Registrar
        </button>
      </div>
      <p
        data-testid="common_login__element-invalid-email"
      >
        {!isLogged && 'Usuário inválido!'}
      </p>
    </div>
  );
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
