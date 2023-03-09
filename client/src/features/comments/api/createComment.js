async function createComment(data, postId) {
  let commentId;
  try {
    const response = await fetch(`/api/posts/${postId}/comments`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body: data, postId: postId }),
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

export default createComment;
