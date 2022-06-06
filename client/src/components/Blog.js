import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostCount, getPosts } from '../api/post';
import Header from './Header';
import BlogPosts from './BlogPosts';
import BlogPagination from './BlogPagination';
import style from '../styles/Blog.module.scss';
import LoadingSpinner from './LoadingSpinner';

const POSTS_PER_PAGE = 10;

function Blog({ user }) {
  let { pageNum } = useParams();
  pageNum = pageNum ? +pageNum : 1;

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
    async function fetchPostsForPage() {
      try {
        const limit = POSTS_PER_PAGE;
        const offset = POSTS_PER_PAGE * (page - 1);
        const response = await getPosts(limit, offset);
        const posts = await response.json();
        setPosts(posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostsForPage();
  }, [page]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      try {
        const response = await getPostCount();
        const numPosts = await response.json();
        setTotalNumPosts(numPosts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotalNumPosts();
  }, []);

  return (
    <div className={style.BlogContainer}>
      <Header />
      <div className={style.mainContent}>
        <h1 className={style.blogTitle}>Untitled Blog</h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <BlogPosts posts={posts} authUser={user} />
            <BlogPagination
              currPage={page}
              totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Blog;
