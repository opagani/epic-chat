import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "src/utils/firebase";
import { useEffect } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function useAuthUser() {
  const [user] = useAuthState(auth);

  // console.log(user);

  useEffect(() => {
    if (user) {
      // "users" collection reference -> user.uid document reference -> user doc data
      const useRef = doc(db, `users/${user.uid}`);
      getDoc(useRef)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            setDoc(snapshot.ref, {
              name: user.displayName,
              photoURL: user.photoURL,
              timestamp: serverTimestamp(),
            });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      console.log("No user is signed in.");
    }
  }, [user]);

  return user;
}
