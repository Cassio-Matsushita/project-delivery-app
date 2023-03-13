import React, { useState, useEffect } from 'react';

const SIX = 6;
const TWELVE = 12;

export default function ManageUsers() {
  const [dados, setDados] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // aqui vai o cadastro de novos usuários;
  };

  return (
    <div>
      <header>Gerenciar Usuários</header>

      <h3>Cadastrar Novo usuário</h3>
      <form onSubmit={ handleSubmit }>
        <label
          htmlFor="name"
        >
          Nome
          <input
            name="name"
            type="text"
            placeholder="Nome"
            data-testid="admin_manage__input-name"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          />
        </label>

        <label
          htmlFor="email"
        >
          Email
          <input
            name="email"
            type="text"
            placeholder="Email"
            data-testid="admin_manage__input-email"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          />
        </label>

        <label
          htmlFor="password"
        >
          Senha
          <input
            name="password"
            type="text"
            placeholder="*********"
            data-testid="admin_manage__input-password"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          />
        </label>

        <label
          htmlFor="role"
        >
          Tipo
          <select
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ (e) => setDados({ ...dados, [e.target.name]: e.target.value }) }
          >
            <option value="seller">Vendedor(a)</option>
            <option value="customer">Cliente</option>
          </select>
        </label>

        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ isBtnDisabled }
        >
          Cadastrar
        </button>

      </form>
    </div>

  );
}
