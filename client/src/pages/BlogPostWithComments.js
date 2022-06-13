import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/posts';
import BlogPost from '../components/BlogPost';
import CommentsSection from '../components/CommentsSection';
import LoadingSpinner from '../components/LoadingSpinner';
import style from '../styles/BlogPostWithComments.module.scss';

function BlogPostWithComments() {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getPost(postId);
        setPost(await response.json());
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPost();
  }, [postId]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={style.container}>
          <BlogPost post={post} />
          <CommentsSection postAuthor={post.author} postId={post.id} />
        </div>
      )}
    </>
  );
}

export default BlogPostWithComments;
