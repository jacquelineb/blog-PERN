async function createPost(title, body) {
  let isCreated = false;
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
    if (response.status === 200) {
      isCreated = true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return isCreated;
  }
}

async function editPost(id, title, body) {
  let isUpdated = false;
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
    if (response.status === 200) {
      isUpdated = true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return isUpdated;
  }
}

async function deletePost(postId) {
  let isDeleted = false;
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (response.status === 200) {
      isDeleted = true;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return isDeleted;
  }
}

async function getTotalPostCount() {
  let numPosts = 0;
  try {
    const response = await fetch('/api/posts/count');
    if (response.status === 200) {
      numPosts = await response.json();
    }
    return numPosts;
  } catch (error) {
    console.error(error);
  } finally {
    return numPosts;
  }
}

async function getPosts(limit, offset) {
  let posts = [];
  try {
    const response = await fetch(`/api/posts?limit=${limit}&offset=${offset}`);
    if (response.status === 200) {
      posts = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return posts;
  }
}

async function getPost(id) {
  let post = null;
  try {
    const response = await fetch(`/api/posts/${id}`);
    if (response.status === 200) {
      post = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return post;
  }
}

export { createPost, editPost, deletePost, getTotalPostCount, getPosts, getPost };
