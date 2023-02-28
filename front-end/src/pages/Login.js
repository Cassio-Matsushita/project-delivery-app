import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const SIX = 6;

export default function Login() {
  const [email, setChangeEmail] = useState('');
  const [password, setChangePass] = useState('');
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
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Registrar
        </button>
      </div>
      <p
        data-testid="common_login__element-invalid-email"
      >
        Usuário inválido!
      </p>
    </div>
  );
}
