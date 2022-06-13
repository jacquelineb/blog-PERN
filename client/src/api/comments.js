async function createCommentForPost(comment, postId) {
  try {
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: comment, postId: postId }),
    });

    if (response.status === 201) {
      const { comment_id } = await response.json();
      return comment_id;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
}

async function getCommentsForPost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}/comments`);
    if (response.status === 200) {
      return await response.json();
    }

    return [];
  } catch (error) {
    console.error(error);
  }
}

async function getCommentById(id) {
  try {
    const response = await fetch(`/api/comments/${id}`);
    if (response.status === 200) {
      return await response.json();
    }

    return {};
  } catch (error) {
    console.error(error);
  }
}

export { getCommentsForPost, createCommentForPost, getCommentById };
