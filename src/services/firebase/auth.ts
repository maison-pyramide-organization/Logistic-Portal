import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from ".";

const signIn = async (email: string, password: string) => {
  try {
    // await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return { user };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };
  }
};

const logout = async() =>{
  await signOut(auth)
}

export { signIn,logout };
