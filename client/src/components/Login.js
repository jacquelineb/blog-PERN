import React, { useState, useEffect } from 'react';
import style from '../styles/Login.module.scss';

function Login({ handleLogIn }) {
  const [loginError, setLoginError] = useState(false);

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
    try {
      e.preventDefault();
      const credentials = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const loginSuccessful = await handleLogIn(credentials);
      setLoginError(!loginSuccessful);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={style.formContainer}>
      <h1>Log in</h1>
      {loginError ? (
        <p className={style.errorMsg}>The email or password you entered is incorrect.</p>
      ) : null}
      <form className={style.form} onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' required />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' required />
        </div>
        <div>
          <button type='submit'>Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
