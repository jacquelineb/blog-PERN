import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getTotalPostCount, getPosts } from '../api/posts';
import { useAuthContext } from '../context/AuthContext';
import BlogPost from '../components/BlogPost';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import PostToolbar from '../components/PostToolbar.js';
import style from '../styles/Profile.module.scss';
import Page from '../layouts/Page';

import { getUserDetails } from '../api/users';

import banner from '../assets/header.png';
import defaultAvatar from '../assets/avatar.png';

const POSTS_PER_PAGE = 10;

function Profile() {
  const { authUser } = useAuthContext();
  const history = useHistory();
  const params = useParams();
  const profile = params.username;
  let pageNum = params.pageNum;
  pageNum = parseInt(pageNum) || 1;

  const [posts, setPosts] = useState([]);
  const [totalNumPosts, setTotalNumPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: '', bio: '', avatar: '' });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const _userDetails = await getUserDetails(profile);
      const { username, bio, avatar } = _userDetails;
      setUserDetails({ username, bio, avatar });
    })();
  }, [profile]);

  useEffect(() => {
    async function fetchPostsForPage() {
      //setIsLoading(true);
      const limit = POSTS_PER_PAGE;
      const offset = POSTS_PER_PAGE * (pageNum - 1);
      const _posts = await getPosts(userDetails.username, limit, offset);
      setPosts(_posts);
      //setIsLoading(false);
    }
    fetchPostsForPage();
  }, [userDetails.username, pageNum]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      const numPosts = await getTotalPostCount(userDetails.username);
      setTotalNumPosts(numPosts);
      setIsLoading(false);
    }
    fetchTotalNumPosts();
  }, [userDetails.username]);

  return (
    <Page>
      <Page.Main>
        <div>
          <img className={style.banner} src={banner} alt='banner' />
          <div className={`${style.userDetails} ${style.main}`}>
            <img
              className={style.avatar}
              src={userDetails.avatar ? userDetails.avatar : defaultAvatar}
              alt='user avatar'
            />
            <div className={style.username}>{userDetails.username}</div>
            <div className={style.bio}>{userDetails.bio}</div>
          </div>
        </div>
        <div className={style.mainContent}>
          {authUser === userDetails.username ? <PostToolbar tools={['create']} /> : null}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className={style.posts}>
                {posts.map((post) => {
                  return (
                    <div className={style.postContainer} key={post.id} data-post-id={post.id}>
                      {authUser === userDetails.username ? (
                        <PostToolbar tools={['edit', 'delete']} post={post} />
                      ) : null}
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
                onPageChange={(pageNum) => {
                  history.push(`/profile/${profile}/page/${pageNum}`);
                }}
              />
            </>
          )}
        </div>
      </Page.Main>
      <Page.Sidebar>
        <div className={`${style.userDetails} ${style.side}`}>
          <img
            className={style.avatar}
            src={userDetails.avatar ? userDetails.avatar : defaultAvatar}
            alt='user avatar'
          />
          <div className={style.username}>{userDetails.username}</div>
          <div className={style.bio}>{userDetails.bio}</div>
        </div>
      </Page.Sidebar>
    </Page>
  );
}

export default Profile;
