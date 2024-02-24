import Add from '../../assets/img/addAvatar.png'
import { signUp } from '../../firebase/authentication'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './style.scss'

function Register() {
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const [
      { value: displayName }, 
      { value: email }, 
      { value: password }, 
      { files }
    ] = e.target
    let response = await signUp(displayName, email, password, files[0])
    typeof response != 'string' ?
    navigate('/') :
    setErr(response)
  }

  return (
    <div className="form-container">
        <div className="form-wrapper">
            <p>Register</p>
            <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="display name" />
            <input required type="email" placeholder="email" />
            <input required type="password" placeholder="password" />
            <input required style={{ display: "none" }} type="file" id="file" accept='image/*' />
            <label htmlFor="file">
                <img src={Add} alt="" />
                <span>Add an avatar</span>
            </label>
            <button>Sign up</button>
            </form>
            <p>
              Do you have an account ? <Link to="/login">Login</Link>
            </p>
            {err && <p style={{color: 'red'}}>{err}</p>}
        </div>
    </div>
  )
}
export default Register