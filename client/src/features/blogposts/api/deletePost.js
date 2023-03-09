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

export default deletePost;
