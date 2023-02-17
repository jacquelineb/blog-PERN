import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api/posts';
import { getUserDetails } from '../api/users';
import Avatar from '../components/Avatar';
import BlogPost from '../components/BlogPost';
import CommentsSection from '../components/CommentsSection';
import LoadingSpinner from '../components/LoadingSpinner';
import Page from '../layouts/Page';
import UserCard from '../components/UserCard';
import style from '../styles/BlogPostWithComments.module.scss';

function BlogPostWithComments() {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [author, setAuthor] = useState({ username: '', bio: '', avatar: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const _post = await getPost(postId);
      const _author = await getUserDetails(_post.author);
      setPost(_post);
      setAuthor(_author);
      setIsLoading(false);
    })();
  }, [postId]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Page>
          <Page.Main>
            <div className={style.BlogPostWithComments}>
              {post ? (
                <>
                  <div className={style.author}>
                    <Avatar
                      src={author.avatar}
                      alt={`${author.username}'s avatar`}
                      size='small'
                    />
                    <div>{post.author}</div>
                  </div>
                  <BlogPost post={post} />
                  <CommentsSection postAuthor={post.author} postId={post.id} />
                </>
              ) : null}
            </div>
          </Page.Main>
          <Page.Sidebar>
            <div className={style.sticky}>
              <UserCard
                avatar={author.avatar}
                username={author.username}
                bio={author.bio}
                size='large'
              />
            </div>
          </Page.Sidebar>
        </Page>
      )}
    </>
  );
}

export default BlogPostWithComments;
