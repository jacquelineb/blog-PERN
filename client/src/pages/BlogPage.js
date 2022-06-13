import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTotalPostCountHeader, getPosts } from '../api/posts';
import style from '../styles/BlogPage.module.scss';
import BlogPost from '../components/BlogPost';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import PostToolbar from '../components/PostToolbar.js';

const POSTS_PER_PAGE = 10;

function BlogPage({ authUser }) {
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
        const response = await getTotalPostCountHeader();
        const numPosts = response.headers.get('Total-Count');
        setTotalNumPosts(numPosts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotalNumPosts();
  }, []);

  return (
    <div className={style.container}>
      {authUser ? <PostToolbar tools={['create']} /> : null}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={style.posts}>
            {posts.map((post) => {
              return (
                <div className={style.postContainer} key={post.id} data-post-id={post.id}>
                  <BlogPost post={post} />
                  {authUser ? <PostToolbar tools={['edit', 'delete']} post={post} /> : null}
                  <Link to={`/post/${post.id}`}>Comments</Link>
                </div>
              );
            })}
          </div>

          <Pagination
            currPage={page}
            totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
          />
        </>
      )}
    </div>
  );
}

export default BlogPage;
