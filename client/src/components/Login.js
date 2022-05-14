import React, { useState } from 'react';
import styles from '../styles/form.module.scss';

function Login({ logIn }) {
  const [loginError, setLoginError] = useState(false);

  return (
    <div className={styles.formContainer}>
      <h1>Log in</h1>
      {loginError ? (
        <p className={styles.errorMsg}>The email or password you entered is incorrect.</p>
      ) : null}
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          const credentials = {
            email: e.target.email.value,
            password: e.target.password.value,
          };

          const resStatus = await logIn(credentials);
          if (resStatus === 401) {
            setLoginError(true);
          }
        }}
      >
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
