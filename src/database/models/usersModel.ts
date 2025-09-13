import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../firestore";

export const createUser = async (data) => {
  const userData = {
    name: data.name,
    type: data.type,
    email: data.email,
  };

  try {
    const user = await setDoc(doc(db, "users", data.email), userData);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
