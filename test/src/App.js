import './App.css';
import Login from './pages/login';
import { useContext, useEffect } from 'react'
import AuthContext from './context/authProvider'

function App() {
  const { auth, setAuth } = useContext(AuthContext)


  const getToken = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      setAuth({ authState: false })
    } else {
      // check token with api
      const response = await fetch('http://localhost:8080/api/verify', {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        }
      }).then(res => res.json())
      console.log(response)
      // if everything is good then set authState to true
    }
  }
  getToken()

  useEffect(() => {
    // getToken()
  }, [auth.authState])


  return (
    <div className="App">
      {
        auth.authState ? <Dashboard /> : <Login />
      }
    </div>
  );
}

const Dashboard = () => {
  const { setAuth } = useContext(AuthContext)
  return (
    <>
      <h1 className='mt-4 border-2 border-t-white pb-5 border-b-indigo-500'>Dashboard</h1>
      <button className='border-2 px-5 py-1 m-10 border-indigo-300 rounded-md' onClick={() => {
        setAuth({ authState: false })
      }}>Logout</button>
    </>
  )
}

export default App;
