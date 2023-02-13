import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTotalPostCount, getPosts } from '../api/posts';
import { useAuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import BlogPost from '../components/BlogPost';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import PostToolbar from '../components/PostToolbar.js';
import style from '../styles/Profile.module.scss';

const POSTS_PER_PAGE = 10;

function BlogPage() {
  const { user } = useAuthContext();
  let { pageNum } = useParams();
  pageNum = parseInt(pageNum) || 1;

  const [posts, setPosts] = useState([]);
  const [totalNumPosts, setTotalNumPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPostsForPage() {
      setIsLoading(true);
      const limit = POSTS_PER_PAGE;
      const offset = POSTS_PER_PAGE * (pageNum - 1);
      const _posts = await getPosts(limit, offset);
      setPosts(_posts);
      setIsLoading(false);
    }
    fetchPostsForPage();
  }, [pageNum]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      const numPosts = await getTotalPostCount();
      setTotalNumPosts(numPosts);
    }
    fetchTotalNumPosts();
  }, []);

  return (
    <div className={style.container}>
      <Header />
      {user ? <PostToolbar tools={['create']} /> : null}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={style.posts}>
            {posts.map((post) => {
              return (
                <div className={style.postContainer} key={post.id} data-post-id={post.id}>
                  {user ? <PostToolbar tools={['edit', 'delete']} post={post} /> : null}
                  <BlogPost post={post} />
                  <Link className={style.commentsLink} to={`/post/${post.id}`}>
                    Comments
                  </Link>
                </div>
              );
            })}
          </div>

          <Pagination
            currPage={pageNum}
            totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
          />
        </>
      )}
    </div>
  );
}

export default BlogPage;
