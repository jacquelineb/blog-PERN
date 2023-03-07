import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';

const routes = (
  <Switch>
    <Route path={'/profile/:username'}>
      <Profile />
    </Route>
    <Route exact path='/login'>
      <Login />
    </Route>
    <RestrictedRoute exact path='/signup'>
      <Signup />
    </RestrictedRoute>
    <PrivateRoute exact path='/dashboard'>
      <Dashboard />
    </PrivateRoute>
    <Route exact path='/'>
      <Landing />
    </Route>
    <Route path='*'>
      <NotFound />
    </Route>
  </Switch>
);

function PrivateRoute({ children, ...rest }) {
  const { authUser } = useAuthContext();
  return authUser ? <Route {...rest}>{children}</Route> : <Redirect to='/login' />;
}

function RestrictedRoute({ children, ...rest }) {
  const { authUser } = useAuthContext();
  return !authUser ? <Route {...rest}>{children}</Route> : <Redirect to='/dashboard' />;
}

export default routes;
