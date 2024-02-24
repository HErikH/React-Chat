import Cam from '../../assets/img/cam.png'
import Add from '../../assets/img/add.png'
import More from '../../assets/img/more.png'
import Messages from '../messages/Messages';
import Input from '../ui/input/Input'
import { ChatContext } from '../../context/ChatContext';
import { useContext } from 'react';
import "./style.scss";

function Chat() {
  const { data } = useContext(ChatContext)

  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
        <div className="chat__icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
export default Chat;
