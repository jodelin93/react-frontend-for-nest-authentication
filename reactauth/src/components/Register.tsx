import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();

    axios.post('register', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <form className="form-signin" onSubmit={submit}>
        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          required
          autoFocus
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="btn btn-lg btn-primary btn-block"
          value="Register"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
