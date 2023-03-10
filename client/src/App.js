import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routes from './routes';
import NavBar from './components/NavBar';
import style from './App.module.scss';

function App() {
  return (
    <div className={style.AppContainer}>
      <Router>
        <AuthProvider>
          <NavBar />
          {routes}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
