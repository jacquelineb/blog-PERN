import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
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
      <form className={style.form} onSubmit={onSubmit}>
        <div className={style.formSection}>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' required />
        </div>
        <div className={style.formSection}>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' required />
        </div>
        <div className={style.formSection}>
          <button type='submit'>Log in</button>
        </div>
      </form>
      {error ? <div className={style.errorMsg}>{error}</div> : null}
      <div>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
