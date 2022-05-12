import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
//import '../styles/Signup.css';
import styles from '../styles/form.module.scss';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  let history = useHistory();

  async function handleSignup(e) {
    e.preventDefault();
    const postData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(postData),
    });

    if (response.status === 200) {
      console.log('Successfully registered.');
      history.push({
        pathname: '/login',
        state: {
          redirect: true,
        },
      });
    } else if (response.status === 401) {
      setErrors(await response.json());
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSignup}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            name='username'
            pattern='[a-zA-Z0-9_-]+'
            maxLength='32'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors && errors.usernameTaken ? <p>Username already in use.</p> : null}
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors && errors.emailTaken ? <p>Email already in use.</p> : null}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            title='Must contain at least one number, one uppercase and lowercase letter, and be 8 or more characters in length'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className='pwCheckbox'
            type='checkbox'
            id='show-password'
            name='show-password'
            onChange={(e) => {
              const passwordInput = document.querySelector('input[name="password"]');
              if (e.target.checked) {
                passwordInput.type = 'text';
              } else {
                passwordInput.type = 'password';
              }
            }}
          />
          <label htmlFor='show-password'>
            <span>Show password</span>
          </label>

          <p>
            Username may only contain letters (a-z, A-Z), numbers, hyphens and/or underscores.
            (Max length of 32 characters)
          </p>
          <p>
            Password must be at least 8 characters long, containing at least one number, one
            uppercase letter, and one lowercase letter.
          </p>
        </div>
        <div>
          <button type='submit'>Sign up</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
