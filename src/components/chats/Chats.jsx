import { useEffect, useState, useContext } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase/firebase";
import "./style.scss";

function Chats() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext)
  const [chats, setChats] = useState(null);

  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    }

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  function handleSelect(payload) {
    dispatch({type: 'CHANGE_USER', payload})
  }

  return (
    <div className="chats">
      {chats && Object.entries(chats).map((chat) => {
        return (
        <div 
        className="user-chat" 
        key={chat[0]} 
        onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img
            src={chat[1].userInfo.photoURL}
            alt="avatar"
          />
          <div className="user-chat__info">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      )})}
    </div>
  );
}
export default Chats;
