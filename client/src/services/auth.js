async function authVerify() {
  let user;
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 200) {
      user = (await response.json()).user;
    }
  } catch (error) {
    console.error(error);
  }
  return user;
}

async function authLogin(credentials) {
  let loginStatus = {};
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (response.status === 200) {
      const { user } = await response.json();
      loginStatus = { user };
    } else {
      let errorMsg;
      if (response.status === 401) {
        errorMsg = 'The email or password you entered is incorrect.';
      } else if (response.status === 403) {
        errorMsg = 'Already logged into another account.';
      } else if (response.status === 500) {
        errorMsg = 'Server could not be reached.';
      }
      loginStatus = { error: errorMsg };
    }

    return loginStatus;
  } catch (error) {
    console.error(error);
  }
}

async function authLogout() {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { authVerify, authLogin, authLogout };
