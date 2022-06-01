async function authVerify() {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

async function authLogin(credentials) {
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

    return response;
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
