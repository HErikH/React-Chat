import Navbar from '../navbar/Navbar'
import Search from '../ui/search/Search'
import Chats from '../chats/Chats'
import './style.scss'

function Sidebar() {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}
export default Sidebar