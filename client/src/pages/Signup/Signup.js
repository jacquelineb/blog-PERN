import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from '../../components/Form';
import style from './Signup.module.scss';

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
    const response = await fetch('/api/auth/register', {
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
    <div className={style.Signup}>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignup}>
        <Form.Section>
          <Form.Label htmlForm='username'>Username:</Form.Label>
          <Form.Input
            type='text'
            id='username'
            name='username'
            pattern='[a-zA-Z0-9_-]+'
            maxLength='32'
            title='May only contain letters (a-z, A-Z), numbers, hyphens and/or underscores'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors && errors.usernameTaken ? (
            <div className={style.errorMsg}>Username already in use.</div>
          ) : null}
        </Form.Section>
        <Form.Section>
          <Form.Label htmlFor='email'>Email:</Form.Label>
          <Form.Input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors && errors.emailTaken ? (
            <div className={style.errorMsg}>Email already in use.</div>
          ) : null}
        </Form.Section>
        <Form.Section>
          <Form.Label htmlFor='password'>Password:</Form.Label>
          <Form.Input
            type='password'
            id='password'
            name='password'
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            title='Must contain at least one number, one uppercase and lowercase letter, and be 8 or more characters in length'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Input
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
          <Form.Label htmlFor='show-password'>
            <span>Show password</span>
          </Form.Label>
        </Form.Section>
        <Form.Section>
          <Form.SubmitButton>Sign up</Form.SubmitButton>
        </Form.Section>
      </Form>
      <p>
        Already have an account? <Link to='/login'>Log in</Link>
      </p>
    </div>
  );
}

export default Signup;
