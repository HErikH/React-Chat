import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./firebase";
import { v4 as uuid } from "uuid";

export default async function sendMessage(data, currentUser, img, text) {
      if (img) {
            const storageRef = ref(storage, uuid());

            await uploadBytesResumable(storageRef, img).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              });
            })
          } else {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          }
      
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
    }
