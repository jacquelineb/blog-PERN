import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import style from './styles/App.module.scss';
import LandingPage from './components/LandingPage';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    JSON.parse(localStorage.getItem('isAuthenticated')) ? true : false
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    return currentUser ? currentUser : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    localStorage.setItem('currentUser', currentUser);
  }, [isAuthenticated, currentUser]);

  async function handleLogIn(credentials) {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (response.status === 200) {
      setIsAuthenticated(true);
      const { user } = await response.json();
      setCurrentUser(user);
    }

    return response.status;
  }

  async function handleLogOut() {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.status === 200) {
      setIsAuthenticated(false);
    }
    console.log(await response.json());
  }

  return (
    <>
      <Router>
        <NavBar isAuth={isAuthenticated} currUser={currentUser} logOut={handleLogOut} />

        <div className={style.mainContent}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route
              path='/login'
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <Login {...props} logIn={handleLogIn} />
                )
              }
            />
            <Route
              path='/dashboard'
              render={() => (isAuthenticated ? <Dashboard /> : <Redirect to='/login' />)}
            />
            <Route
              path='/signup'
              render={() => (isAuthenticated ? <Redirect to='/dashboard' /> : <Signup />)}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
