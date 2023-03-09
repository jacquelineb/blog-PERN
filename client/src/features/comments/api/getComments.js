async function getComments(postId, limit, offset) {
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

async function getCommentCount(postId) {
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

export default getComments;
export { getCommentCount };
