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

  const [posts, setPosts] = useState([]);
  const [totalNumPosts, setTotalNumPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();

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
      const limit = POSTS_PER_PAGE;
      const offset = POSTS_PER_PAGE * (pageNum - 1);
      const _posts = await getPosts(userDetails.username, limit, offset);
      setPosts(_posts);
    }

    if (userDetails) {
      fetchPostsForPage();
    }
  }, [userDetails, pageNum]);

  useEffect(() => {
    async function fetchTotalNumPosts() {
      const numPosts = await getTotalPostCount(userDetails.username);
      setTotalNumPosts(numPosts);
      setIsLoading(false);
    }

    if (userDetails) {
      fetchTotalNumPosts();
    }
  }, [userDetails]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Page>
          <Page.Main>
            <div className={style.header}>
              <img className={style.banner} src={banner} alt='banner' />
              <div className={style.userCardWrapper}>
                <UserCard
                  username={userDetails.username}
                  bio={userDetails.bio}
                  avatar={userDetails.avatar}
                  size='medium'
                />
              </div>
            </div>
            <div className={style.mainContent}>
              {authUser === userDetails.username ? (
                <div className={style.postTools}>
                  <CreateBlogPost />
                </div>
              ) : null}
              <div className={style.posts}>
                {posts.map((post) => {
                  return (
                    <div className={style.postContainer} key={post.id} data-post-id={post.id}>
                      {authUser === userDetails.username ? (
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
              </div>

              <Pagination
                currPage={pageNum}
                totalNumPages={Math.ceil(totalNumPosts / POSTS_PER_PAGE)}
                onPageChange={(pageNum) => {
                  history.push(`/profile/${profile}/page/${pageNum}`);
                }}
              />
            </div>
          </Page.Main>
          <Page.Sidebar>
            <div className={style.sticky}>
              <UserCard
                username={userDetails.username}
                bio={userDetails.bio}
                avatar={userDetails.avatar}
                size='large'
              />
            </div>
          </Page.Sidebar>
        </Page>
      )}
    </>
  );
}

export default Profile;
