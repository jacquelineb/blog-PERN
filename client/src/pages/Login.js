import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import style from '../styles/Login.module.scss';

function Login() {
  const [loginError, setLoginError] = useState(false);
  const { user, login } = useAuthContext();

  useEffect(() => {
    /* Without this useEffect I will get a warning:
      Can't perform a React state update on an unmounted component This is a no-op,
      but it indicates a memory leak in your application. To fix, cancel all
      subscriptions and asynchronous tasks in a useEffect cleanup function.
     */
    return () => {
      setLoginError(false);
    };
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const credentials = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const loginSuccessful = await login(credentials);
      setLoginError(!loginSuccessful);
    } catch (error) {
      console.error(error);
    }
  }

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={style.formContainer}>
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
      {loginError ? (
        <p className={style.errorMsg}>The email or password you entered is incorrect.</p>
      ) : null}
    </div>
  );
}

export default Login;
