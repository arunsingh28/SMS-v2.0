import './App.css';
import Login from './pages/login';
import { useContext } from 'react'
import AuthContext from './context/authProvider'

function App() {
  const { auth } = useContext(AuthContext)

  return (
    <div className="App">
      {
        auth ? <Login /> : 'Dashboard'
      }
    </div>
  );
}

export default App;
