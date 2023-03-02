import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

const SIX = 6;
const TWELVE = 12;
const STATUS_CREATED = 201;

export default function Register({ history }) {
  const [dados, setDados] = useState({ name: '', email: '', password: '' });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [errorMess, setErrorMess] = useState('');

  useEffect(() => {
    const validEmail = dados.email
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const validPassword = dados.password.length >= SIX;
    const validName = dados.name.length >= TWELVE;
    if (validEmail && validPassword && validName) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [dados]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/register', dados);
      console.log(response.data);
      if (response.status === STATUS_CREATED && response.data.role === 'customer') {
        history.push('/customer/products');
      }
    } catch (error) {
      return setErrorMess(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <label htmlFor="name">
          Nome
          <input
            data-testid="common_register__input-name"
            id="name"
            name="name"
            type="text"
            placeholder="Seu name"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            data-testid="common_register__input-email"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="common_register__input-password"
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          disabled={ isBtnDisabled }
          type="submit"
        >
          CADASTRAR
        </button>
      </form>
      {errorMess.length > 0 && (
        <p data-testid="common_register__element-invalid_register">
          {errorMess}
        </p>
      )}
    </div>
  );
}

Register.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
