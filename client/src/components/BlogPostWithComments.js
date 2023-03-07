import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost } from '../api/posts';
import { getUserDetails } from '../api/users';
import Avatar from './Avatar';
import BlogPost from './BlogPost';
import CommentsSection from './CommentsSection';
import LoadingSpinner from './LoadingSpinner';
import style from '../styles/BlogPostWithComments.module.scss';

function BlogPostWithComments() {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState({ username: '', bio: '', avatar: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const _post = await getPost(postId);
      setPost(_post);
      if (_post) {
        const _author = await getUserDetails(_post.author);
        setAuthor(_author);
      }
      setIsLoading(false);
    })();
  }, [postId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={style.BlogPostWithComments}>
      {post ? (
        <>
          <div className={style.author}>
            <Link className={style.link} to={`/profile/${post.author}`}>
              <Avatar src={author.avatar} alt={`${author.username}'s avatar`} size='small' />
            </Link>
            <Link className={style.link} to={`/profile/${post.author}`}>
              {post.author}
            </Link>
          </div>
          <BlogPost post={post} />
          <CommentsSection postAuthor={post.author} postId={post.id} />
        </>
      ) : (
        <div>The post you're looking for doesn't exist.</div>
      )}
    </div>
  );
}

export default BlogPostWithComments;
