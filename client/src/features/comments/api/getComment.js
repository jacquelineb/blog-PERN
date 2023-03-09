async function getComment(commentId) {
  let comment = {};
  try {
    const response = await fetch(`/api/comments/${commentId}`);
    if (response.status === 200) {
      comment = await response.json();
    }
  } catch (error) {
    console.error(error);
  } finally {
    return comment;
  }
}

export default getComment;
