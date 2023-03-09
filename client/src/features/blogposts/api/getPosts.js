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

async function getTotalPostCount(username) {
  try {
    const response = await fetch(`/api/posts/count?username=${username}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default getPosts;
export { getTotalPostCount };
