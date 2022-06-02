async function createPost(title, body) {
  try {
    await fetch('/api/posts/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ title, body }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function editPost(id, title, body) {
  try {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ title, body }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function deletePost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getPostCount() {
  try {
    const response = await fetch('/api/posts/count');
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function getPosts(limit, offset) {
  try {
    const response = await fetch(`/api/posts?limit=${limit}&offset=${offset}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { createPost, editPost, deletePost, getPostCount, getPosts };