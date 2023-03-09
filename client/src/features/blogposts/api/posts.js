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

async function editPost(id, title, body) {
  try {
    const response = await fetch(`/api/posts/${id}`, {
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

async function deletePost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    // Return bool indicating whether or not post was successfully deleted
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
}

async function getTotalPostCount(username) {
  try {
    const response = await fetch(`/api/posts/count?username=${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getPosts(username, limit, offset) {
  try {
    const response = await fetch(
      `/api/posts?username=${username}&limit=${limit}&offset=${offset}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getPost(id) {
  try {
    const response = await fetch(`/api/posts/${id}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export { createPost, editPost, deletePost, getTotalPostCount, getPosts, getPost };
