import { useContext, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { AuthContext } from '../../../context/AuthContext'
import addUserChat from '../../../firebase/addUserChat'
import './style.scss'

function Search() {
  const { currentUser } = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [err, setErr] = useState(false)

  async function handleSearch() {
    const q = query(collection(db, 'users'), where('displayName', '==', username))
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      setErr(true) 
    }
  }

  function handleKey(e) {
    if (e.code == 'Enter') {
      handleSearch()
    }
  }

  async function handleSelect() {
    await addUserChat(currentUser, user)
    setUser(null);
    setUsername("")
  }

  return (
    <div className="search">
      <div className="search__form">
        <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKey}
        type="text" 
        placeholder='Find a user' 
        />
      </div>
      {err && <span style={{color: 'red'}}>User not found !</span>}
      {user && <div className="user-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="avatar" />
        <div className="user-chat__info">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}
export default Search 