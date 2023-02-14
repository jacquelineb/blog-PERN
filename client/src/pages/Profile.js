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
import Page from '../layouts/Page';

import { getUserDetails } from '../api/users';

import banner from '../assets/header.png';
import defaultAvatar from '../assets/avatar.png';

const POSTS_PER_PAGE = 10;

function Profile() {
  const { user } = useAuthContext();
  let { pageNum } = useParams();
  pageNum = parseInt(pageNum) || 1;

  const [posts, setPosts] = useState([]);
  const [totalNumPosts, setTotalNumPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({ bio: '', avatar: '' });
  useEffect(() => {
    async function getAdminInfo() {
      try {
        setIsLoading(true);
        const response = await getUserDetails('jab');
        const { bio, avatar } = await response.json();
        setUserDetails({ bio, avatar });
      } catch (error) {}
    }
    getAdminInfo();
  }, []);

  useEffect(() => {
    async function fetchPostsForPage() {
      //setIsLoading(true);
      const limit = POSTS_PER_PAGE;
      const offset = POSTS_PER_PAGE * (pageNum - 1);
      const _posts = await getPosts(limit, offset);
      setPosts(_posts);
      //setIsLoading(false);
    }
    fetchPostsForPage();
  }, [pageNum]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      const numPosts = await getTotalPostCount();
      setTotalNumPosts(numPosts);
      setIsLoading(false);
    }
    fetchTotalNumPosts();
  }, []);

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
            <div className={style.username}>username</div>
            <div className={style.bio}>{userDetails.bio}</div>
          </div>
        </div>
        <div className={style.mainContent}>
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
      </Page.Main>
      <Page.Sidebar>
        <div className={`${style.userDetails} ${style.side}`}>
          <img
            className={style.avatar}
            src={userDetails.avatar ? userDetails.avatar : defaultAvatar}
            alt='user avatar'
          />
          <div className={style.username}>username</div>
          <div className={style.bio}>{userDetails.bio}</div>
        </div>
      </Page.Sidebar>
    </Page>
    // <div className={style.container}>
    //   <div className={style.main}>
    //     <Header />
    //     {user ? <PostToolbar tools={['create']} /> : null}
    //     {isLoading ? (
    //       <LoadingSpinner />
    //     ) : (
    //       <>
    //         <div className={style.posts}>
    //           {posts.map((post) => {
    //             return (
    //               <div className={style.postContainer} key={post.id} data-post-id={post.id}>
    //                 {user ? <PostToolbar tools={['edit', 'delete']} post={post} /> : null}
    //                 <BlogPost post={post} />
    //                 <Link className={style.commentsLink} to={`/post/${post.id}`}>
    //                   Comments
    //                 </Link>
    //               </div>
    //             );
    //           })}
    //         </div>

    //         <Pagination
    //           currPage={pageNum}
    //           totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
    //         />
    //       </>
    //     )}
    //   </div>
    //   <div className={style.sidebar}>
    //     <Header />
    //   </div>
    // </div>
  );
}

export default Profile;
