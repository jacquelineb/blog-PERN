async function updateAvatar(avatarUrl) {
  try {
    await fetch('/api/users/avatar', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ avatar: avatarUrl }),
    });
  } catch (error) {
    console.error(error);
  }
}

export default updateAvatar;
