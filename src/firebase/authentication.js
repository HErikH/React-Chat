import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "./firebase";

export async function signUp(displayName, email, password, file) {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(response.user, {
            displayName,
            photoURL: downloadURL
          })
          await setDoc(doc(db, "users", response.user.uid), {
            uid: response.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });
          await setDoc(doc(db, 'userChats', response.user.uid), {})
        } catch (error) {
          const { code: errorCode, message: errorMessage } = error;
          return `${errorCode} ${errorMessage}`
        }
      })
    })
  } catch (error) {
    const { code: errorCode, message: errorMessage } = error;
    return `${errorCode} ${errorMessage}`
  }
}

export async function signIn(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    const { code: errorCode, message: errorMessage } = error;
    return `${errorCode} ${errorMessage}`
  }
}