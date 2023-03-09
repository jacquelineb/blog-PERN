async function getPost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default getPost;
