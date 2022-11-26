import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data } = await axios.post(
      'login',
      {
        email: email,
        password: password,
      },
      { withCredentials: true },
    );
    axios.defaults.headers.common['Authorization'] = `Bearer${data.token}`;
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </>
  );
}
