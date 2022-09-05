import firebase from "./FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const auth = getAuth(firebase);

const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
    return signOut(auth);
};

const sendResetPasswordEmail = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthUser: any) => {
    onAuthStateChanged(auth, (user) => {
        handleAuthUser(user);
    });
};

const FirebaseAuthService = {
    registerUser,
    loginUser,
    logoutUser,
    sendResetPasswordEmail,
    loginWithGoogle,
    subscribeToAuthChanges,
};

export default FirebaseAuthService;
