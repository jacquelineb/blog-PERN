import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import style from './styles/App.module.scss';

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'GET',
          credentials: 'include',
        });

        const userData = await response.json();
        setCurrUser(userData.user);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getCurrentUser();
  }, []);

  async function handleLogIn(credentials) {
    try {
      const response = await fetch('/api/auth/login', {
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
        setCurrUser(user);
        return true;
      }

      setCurrUser(null);
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLogOut() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.status !== 500) {
        setCurrUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading ? null : (
        <div className={style.AppContainer}>
          <Router>
            <NavBar user={currUser} handleLogOut={handleLogOut} />
            <Switch>
              <Route exact path={['/', '/page/:pageNum([1-9][0-9]*)']}>
                <Blog user={currUser} />
              </Route>
              <Route exact path='/login'>
                {currUser ? <Redirect to='/dashboard' /> : <Login handleLogIn={handleLogIn} />}
              </Route>
              <Route exact path='/dashboard'>
                {currUser ? <Dashboard user={currUser} /> : <Redirect to='/login' />}
              </Route>
              <Redirect to='/' />
            </Switch>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
