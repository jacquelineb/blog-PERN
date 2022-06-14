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

async function getTotalPostCount() {
  try {
    const response = await fetch('/api/posts/', {
      method: 'HEAD',
    });
    const numPosts = response.headers.get('Total-Count');
    return numPosts;
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

async function getPost(id) {
  try {
    const response = await fetch(`/api/posts/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { createPost, editPost, deletePost, getTotalPostCount, getPosts, getPost };
