import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { getPosts, getTotalPostCount } from '../api/posts';
import BlogPost from './BlogPost';
import Pagination from './Pagination';
import { CreateBlogPost, EditBlogPost, DeleteBlogPost } from './PostTools';
import LoadingSpinner from './LoadingSpinner';
import style from '../styles/BlogPosts.module.scss';

const POSTS_PER_PAGE = 10;

function BlogPosts() {
  const { authUser } = useAuthContext();
  const history = useHistory();
  const params = useParams();
  const author = params.username;
  const pageNum = parseInt(params.pageNum) || 1;
  const [posts, setPosts] = useState({ data: [], isLoading: true });
  const [totalNumPosts, setTotalNumPosts] = useState(0);

  useEffect(() => {
    (async () => {
      const limit = POSTS_PER_PAGE;
      const offset = POSTS_PER_PAGE * (pageNum - 1);
      const postData = await getPosts(author, limit, offset);
      setPosts({
        data: postData,
        isLoading: false,
      });
    })();
  }, [author, pageNum]);

  useEffect(() => {
    (async () => {
      setTotalNumPosts(await getTotalPostCount(author));
    })();
  }, [author]);

  return (
    <div className={style.BlogPosts}>
      {authUser === author ? (
        <div className={style.postTools}>
          <CreateBlogPost />
        </div>
      ) : null}

      {posts.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {posts.data.map((post) => {
            return (
              <div className={style.postContainer} key={post.id} data-post-id={post.id}>
                {authUser === author ? (
                  <div className={style.postTools}>
                    <EditBlogPost originalPost={post} />
                    <DeleteBlogPost postId={post.id} />
                  </div>
                ) : null}
                <BlogPost post={post} />
                <div className={style.alignRight}>
                  <Link
                    className={style.commentsLink}
                    to={`/profile/${author}/post/${post.id}`}
                  >
                    Comments
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}

      <Pagination
        currPage={pageNum}
        totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
        onPageChange={(pageNum) => {
          history.push(`/profile/${author}/page/${pageNum}`);
        }}
      />
    </div>
  );
}

export default BlogPosts;
