async function editPost(postId, title, body) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ title, body }),
    });

    // Return bool indicating whether or not post was successfully edited
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}

export default editPost;
