import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Form from '../../components/Form';
import style from './Login.module.scss';

function Login() {
  const { authUser, login, error } = useAuthContext();

  async function onSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    await login(credentials);
  }

  if (authUser) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={style.Login}>
      <h1>Log in</h1>
      <Form onSubmit={onSubmit}>
        <Form.Section>
          <Form.Label htmlFor='email'>Email:</Form.Label>
          <Form.Input type='email' name='email' required />
        </Form.Section>
        <Form.Section>
          <Form.Label htmlFor='password'>Password:</Form.Label>
          <Form.Input type='password' name='password' required />
        </Form.Section>
        <Form.Section>
          <Form.SubmitButton>Log in</Form.SubmitButton>
        </Form.Section>
      </Form>
      {error ? <div className={style.errorMsg}>{error}</div> : null}
      <div>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
