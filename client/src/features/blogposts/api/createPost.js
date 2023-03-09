async function createPost(title, body) {
  try {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ title, body }),
    });

    // Return bool indicating whether or not post was successfully created
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}

export default createPost;
