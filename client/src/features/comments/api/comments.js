async function createCommentForPost(comment, postId) {
  let commentId;
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
      commentId = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return commentId;
  }
}

async function getCommentsForPost(postId, limit, offset) {
  let comments = [];
  try {
    const response = await fetch(
      `/api/posts/${postId}/comments?limit=${limit}&offset=${offset}`
    );

    if (response.status === 200) {
      comments = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return comments;
  }
}

async function getCommentById(id) {
  let comment = {};
  try {
    const response = await fetch(`/api/comments/${id}`);
    if (response.status === 200) {
      comment = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return comment;
  }
}

async function getNumCommentsForPost(postId) {
  let numComments = 0;
  try {
    const response = await fetch(`/api/posts/${postId}/comments/count`);
    if (response.status === 200) {
      numComments = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return numComments;
  }
}

export { getCommentsForPost, createCommentForPost, getCommentById, getNumCommentsForPost };
