import { getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export default async function addUserChat(currentUser, user) {
  const combinedId =
    currentUser.uid > user.uid ? 
    currentUser.uid + user.uid : 
    user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), { message: [] });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error)
  }
}
