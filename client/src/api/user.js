async function getUserDetails(user) {
  try {
    const response = await fetch(`/api/users/${user}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function updateUserBiography(biography) {
  try {
    const response = await fetch(`/api/users/bio`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ bio: biography }),
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

async function updateUserAvatar(avatarUrl) {
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

export { getUserDetails, updateUserBiography, updateUserAvatar };
