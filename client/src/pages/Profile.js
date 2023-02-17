import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getUserDetails } from '../api/users';
import { getTotalPostCount, getPosts } from '../api/posts';
import { useAuthContext } from '../context/AuthContext';
import BlogPost from '../components/BlogPost';
import LoadingSpinner from '../components/LoadingSpinner';
import Page from '../layouts/Page';
import Pagination from '../components/Pagination';
import { CreateBlogPost, EditBlogPost, DeleteBlogPost } from '../components/PostTools';
import UserCard from '../components/UserCard';
import banner from '../assets/header.png';
import style from '../styles/Profile.module.scss';

const POSTS_PER_PAGE = 10;

function Profile() {
  const { authUser } = useAuthContext();
  const history = useHistory();
  const params = useParams();
  const profile = params.username;
  let pageNum = params.pageNum;
  pageNum = parseInt(pageNum) || 1;

  const [user, setUser] = useState({ data: undefined, isLoading: true });
  const [posts, setPosts] = useState({ data: [], isLoading: true });
  const [totalNumPosts, setTotalNumPosts] = useState(0);

  useEffect(() => {
    (async () => {
      const userData = await getUserDetails(profile);
      if (!userData) {
        history.push('/'); // TODO: Create 404 component and redirect to it
      }
      setUser({
        data: userData,
        isLoading: false,
      });
    })();
  }, [profile]);

  useEffect(() => {
    if (!user.isLoading) {
      (async () => {
        const limit = POSTS_PER_PAGE;
        const offset = POSTS_PER_PAGE * (pageNum - 1);
        const postData = await getPosts(user.data.username, limit, offset);
        setPosts({
          data: postData,
          isLoading: false,
        });
      })();
    }
  }, [user, pageNum]);

  useEffect(() => {
    if (!user.isLoading) {
      (async () => {
        setTotalNumPosts(await getTotalPostCount(user.data.username));
      })();
    }
  }, [user]);

  if (user.isLoading) {
    return null;
  }

  return (
    <Page>
      <Page.Main>
        <div className={style.header}>
          <img className={style.banner} src={banner} alt='banner' />

          <div className={style.userCardWrapper}>
            <UserCard
              username={user.data.username}
              bio={user.data.bio}
              avatar={user.data.avatar}
              size='medium'
            />
          </div>

          <div className={style.mainContent}>
            {authUser === user.data.username ? (
              <div className={style.postTools}>
                <CreateBlogPost />
              </div>
            ) : null}

            <div className={style.posts}>
              {posts.isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {posts.data.map((post) => {
                    return (
                      <div className={style.postContainer} key={post.id} data-post-id={post.id}>
                        {authUser === user.data.username ? (
                          <div className={style.postTools}>
                            <EditBlogPost originalPost={post} />
                            <DeleteBlogPost postId={post.id} />
                          </div>
                        ) : null}
                        <BlogPost post={post} />
                        <Link className={style.commentsLink} to={`/post/${post.id}`}>
                          Comments
                        </Link>
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            <Pagination
              currPage={pageNum}
              totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
              onPageChange={(pageNum) => {
                history.push(`/profile/${profile}/page/${pageNum}`);
              }}
            />
          </div>
        </div>
      </Page.Main>

      <Page.Sidebar>
        <div className={style.sticky}>
          <UserCard
            username={user.data.username}
            bio={user.data.bio}
            avatar={user.data.avatar}
            size='large'
          />
        </div>
      </Page.Sidebar>
    </Page>
  );
}

export default Profile;
