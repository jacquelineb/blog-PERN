async function updateBiography(biography) {
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

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default updateBiography;
