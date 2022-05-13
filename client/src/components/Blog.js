import React, { useState, useEffect } from 'react';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = await fetch('http://localhost:5000/posts');
      const posts = await response.json();
      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1>cool blog</h1>
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <Post data={post} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Post({ data }) {
  return (
    <>
      <h1>{data.title}</h1>
      <p>
        Posted by <span>{data.username}</span> on <span>{data.created_on}</span>
      </p>
      <p>{data.body}</p>
    </>
  );
}

export default Blog;
