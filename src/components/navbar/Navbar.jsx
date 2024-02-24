import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './style.scss'

function Navbar() {
  const { currentUser } = useContext(AuthContext)

  return (
    <nav className='navbar'>
        <span className="logo">
          Chat
        </span>
        <div className="user">
            <img src={currentUser.photoURL} alt="avatar" />
            <span>{currentUser.displayName}</span>
            <button onClick={() => signOut(auth)}>
              <Link to='/register'>logout</Link>
            </button>
        </div>
    </nav>
  )
}
export default Navbar