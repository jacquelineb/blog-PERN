async function getUser(username) {
  try {
    const response = await fetch(`/api/users/${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default getUser;
