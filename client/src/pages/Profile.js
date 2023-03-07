import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { getUserDetails } from '../api/users';
import BlogPosts from '../components/BlogPosts';
import BlogPostWithComments from '../components/BlogPostWithComments';
import NotFound from './NotFound';
import UserCard from '../components/UserCard';
import banner from '../assets/header.png';
import style from '../styles/Profile.module.scss';

function Profile() {
  const { path } = useRouteMatch();
  const params = useParams();
  const profile = params.username;

  const [user, setUser] = useState({ data: undefined, isLoading: true });

  useEffect(() => {
    (async () => {
      const userData = await getUserDetails(profile);
      setUser({
        data: userData,
        isLoading: false,
      });
    })();
  }, [profile]);

  if (user.isLoading) {
    return null;
  }

  if (!user.data) {
    return <NotFound />;
  }

  return (
    <Router>
      <div className={style.Profile}>
        <div className={style.mainContent}>
          <Switch>
            <Route exact path={`${path}/post/:postId([1-9][0-9]*)`}>
              <BlogPostWithComments />
            </Route>
            <Route exact path={[`${path}/`, `${path}/page/:pageNum([1-9][0-9]*)`]}>
              <div>
                <img className={style.banner} src={banner} alt='banner' />
                <div className={style.userCardWrapper}>
                  <UserCard
                    username={user.data.username}
                    bio={user.data.bio}
                    avatar={user.data.avatar}
                    size='medium'
                  />
                </div>
              </div>
              <BlogPosts />
            </Route>
            <Redirect to={`/profile/${profile}`} />
          </Switch>
        </div>
        <div className={style.sideContent}>
          <div className={style.sticky}>
            <UserCard
              username={user.data.username}
              bio={user.data.bio}
              avatar={user.data.avatar}
              size='large'
            />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Profile;
