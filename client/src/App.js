import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import style from './styles/App.module.scss';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await fetch('http://localhost:5000/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });

        const userData = await response.json();
        setCurrentUser(userData.user);
        setIsAuthenticated(userData.isAuthenticated);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }
    getCurrentUser();
  }, []);

  async function handleLogIn(credentials) {
    try {
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
        const { user } = await response.json();
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
      return response.status;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleLogOut() {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.status !== 500) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return !isLoading ? (
    <>
      <Router>
        <NavBar isAuth={isAuthenticated} currUser={currentUser} logOut={handleLogOut} />
        <div className={style.mainContent}>
          <Switch>
            <Route exact path={['/', '/page/:pageNum([1-9][0-9]*)']}>
              <Blog isAuth={isAuthenticated} />
            </Route>
            <Route exact path='/login'>
              {isAuthenticated ? <Redirect to='/dashboard' /> : <Login logIn={handleLogIn} />}
            </Route>
            <Route exact path='/dashboard'>
              {isAuthenticated ? <Dashboard /> : <Redirect to='/login' />}
            </Route>
            <Redirect to='/' />
          </Switch>
        </div>
      </Router>
    </>
  ) : null;
}

export default App;
