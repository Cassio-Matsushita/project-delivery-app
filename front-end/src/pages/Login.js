import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <Redirect to="/login" />
      <h1>Login</h1>
    </div>
  );
}
