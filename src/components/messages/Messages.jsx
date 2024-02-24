import Message from "../message/Message";
import { ChatContext } from "../../context/ChatContext";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./style.scss";

function Messages() {
  const [messages, setMessages] = useState(null);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages && messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}
export default Messages;
