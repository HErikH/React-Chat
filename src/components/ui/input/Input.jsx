import Img from '../../../assets/img/img.png'
import Attach from '../../../assets/img/attach.png'
import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";
import { useState, useContext } from 'react';
import sendMessage from '../../../firebase/sendMessage';
import './style.scss'

function Input() {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  async function handleSend() {
    await sendMessage(data, currentUser, img, text)
    setText("");
    setImg(null);
  }

  return (
    <div className="input">
      <input 
      type="text" 
      placeholder='Type...' 
      onChange={(e) => setText(e.target.value)}
      value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input 
        type="file" 
        style={{display: 'none'}} 
        id='file' 
        onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input