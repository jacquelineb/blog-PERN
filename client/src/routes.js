import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Header from './components/Header';
import BlogPage from './pages/BlogPage';
import BlogPostWithComments from './pages/BlogPostWithComments';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const routes = (
  <Switch>
    <Route exact path={['/', '/page/:pageNum([1-9][0-9]*)']}>
      <Header />
      <BlogPage />
    </Route>
    <Route exact path='/post/:postId([1-9][0-9]*)'>
      <Header />
      <BlogPostWithComments />
    </Route>
    <Route exact path='/login'>
      <Login />
    </Route>
    <ProtectedRoute exact path='/dashboard'>
      <Dashboard />
    </ProtectedRoute>
    <Redirect to='/' />
  </Switch>
);

function ProtectedRoute({ children, ...rest }) {
  const { user } = useAuthContext();
  return user ? <Route {...rest}>{children}</Route> : <Redirect to='/login' />;
}

export default routes;