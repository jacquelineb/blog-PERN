import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreateBlogPost } from './BlogPostTransactions';
import Header from './Header';
import BlogPosts from './BlogPosts';
import BlogPagination from './BlogPagination';
import style from '../styles/Blog.module.scss';

function Blog({ user }) {
  let { pageNum } = useParams();
  pageNum = pageNum ? +pageNum : 1;

  const POSTS_PER_PAGE = 10;
  const [page, setPage] = useState(pageNum);
  const [posts, setPosts] = useState([]);
  const [totalNumPosts, setTotalNumPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pageNum) {
      setPage(+pageNum);
    } else {
      setPage(1);
    }
  }, [pageNum]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      try {
        const response = await fetch('http://localhost:5000/posts/count');
        const numPosts = await response.json();
        setTotalNumPosts(numPosts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotalNumPosts();
  }, []);

  useEffect(() => {
    async function fetchPostsForPage(page) {
      try {
        const response = await fetch(
          `http://localhost:5000/posts?limit=${POSTS_PER_PAGE}&offset=${
            POSTS_PER_PAGE * (page - 1)
          }`
        );
        const posts = await response.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostsForPage(page);
  }, [page]);

  return (
    <div className={style.BlogContainer}>
      <Header />
      {isLoading ? null : (
        <div className={style.mainContent}>
          <h1 className={style.blogTitle}>blog</h1>
          {user ? <CreateBlogPost /> : null}
          <BlogPosts posts={posts} authUser={user} />
          <BlogPagination
            currPage={page}
            totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
          />
        </div>
      )}
    </div>
  );
}

export default Blog;
