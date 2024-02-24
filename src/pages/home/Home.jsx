import Sidebar from '../../components/sidebar/Sidebar'
import Chat from '../../components/chat/Chat'
import './style.scss'

function Home() {
  return (
    <div className='home'>
    <div className="container">
      <Sidebar />
      <Chat />
    </div>
  </div>
  )
}
export default Home