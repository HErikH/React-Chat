import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../../firebase/authentication'
import { useState } from 'react'
import './style.scss'

function Login() {
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const [
      { value: email }, 
      { value: password }, 
    ] = e.target
    let response = await signIn(email, password)
    typeof response != 'string' ?
    navigate('/') :
    setErr(response)
  }

  return (
    <div className="form-container">
        <div className="form-wrapper">
            <p>Login</p>
            <form onSubmit={handleSubmit}>
            <input required type="email" placeholder="email" />
            <input required type="password" placeholder="password" />
            <button>Sign in</button>
            </form>
            <p>
              Don't you have an account ? <Link to="/register">Register</Link>
            </p>
            {err && <p style={{color: 'red'}}>{err}</p>}
        </div>
    </div>
  )
}
export default Login