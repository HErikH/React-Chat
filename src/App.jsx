import './App.scss'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const { currentUser } = useContext(AuthContext)

  function ProtectedRoute({ children }) {
    if (!currentUser) return <Navigate to='login' />
    return children
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        <Route index element={
          <ProtectedRoute>
           <Home />
          </ProtectedRoute>
        } />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
