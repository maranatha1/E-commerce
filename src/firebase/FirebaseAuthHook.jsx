import React, { createContext, useContext } from "react";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, collection, query, where, getDocs, setDoc, updateDoc } from "firebase/firestore";
const AuthContext = createContext({}); //creator
export const useAuth = () => useContext(AuthContext); //provider

const PathString = "USERS";

export default function FirebaseAuthHookProvider({ children, ...props }) {
  const [CurrentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async function (user) {
      let UserToUse = {};
      const Ref = collection(FIREBASE_FIRESTORE, PathString);

      if (user !== null) {
        const q = query(Ref, where("uid", "==", `${user.uid}`));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs[0]) {
          const data = querySnapshot.docs[0].data();
          UserToUse = {
            cell: data.cell,
            displayName: data.displayName,
            email: data.email,
            profileUrl: data.profileUrl,
            uid: data.uid,
            role: data.role,
            cart: data.cart
          };
          setCurrentUser(user ? UserToUse : null);
        }
      }
    });
  });

  //sign up usign email and password
  function RegisterEmaillPass(email, password) {
    //firebase call that handles the auth of a new user signing up on our site. this call returns a Promise of type FirebaseUser
    return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }

  //Sign in
  function LoginEmailPass(email, password) {
    return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  }

  //logout and redirects to homepage
  function Logout() {
    signOut(FIREBASE_AUTH);
    window.location.replace("/");
  }

  //Sign in with Google
  function SignInWithGoogle() {
    //provider - the way we coms with firebase to know how to login
    const provider = new GoogleAuthProvider();
    //firebase function that allows us to login with google via a pop up screen
    return signInWithPopup(FIREBASE_AUTH, provider);
  }

  //Sign in Anonymously
  function SignInAnon() {
    return signInAnonymously(FIREBASE_AUTH);
  }

  //Create a new user from Register other functions to co run while it is running
  //async(asycronious) - allows
  async function CreateNewUser(uid, user) {
    // console.log("???", uid, user);
    //  checks that the user exists
    const isUser = user !== undefined && user !== null ? true : false;
    //  checks if the user has a display name
    const dn = isUser && user.displayName !== null ? user.displayName : "";

    //the new user object we want to create
    const payload = {
      displayName: dn.length > 0 ? dn : "",
      email: isUser ? user.email : "",
      profileUrl: isUser && user.profileUrl ? user.profileUrl : "",
      uid: uid,
      role: "user",
      cart: []
    };

    //  FIREBASE    FIRESTORE  IMPLEMENTATION
    const Ref = collection(FIREBASE_FIRESTORE, PathString);
    const docRef = doc(FIREBASE_FIRESTORE, PathString, uid);

    //same structure as an sql query
    const q = query(Ref, where("uid", "==", `${uid}`));
    const querySnapshot = await getDocs(q);
    console.log("q", q, "qs", querySnapshot); // .docs.length

    // checks that user does not exist in our db
    if (querySnapshot.docs.length == 0) {
      //create a db entry
      await setDoc(docRef, payload)
        .then((res) => {
          console.log("Created new user entry in db", res);
        })
        .catch((err) => {
          console.log("ERROR cannot create new user entry in db ", err);
        });
    }
  }

  async function AddProductToCart(uid, order) {
    const docRef = doc(FIREBASE_FIRESTORE, `${PathString}/${uid}`);

    await updateDoc(docRef, { cart: order })
      .then((res) => {
        console.log("Added product to user cart", res);
      })
      .catch((err) => {
        console.log("ERROR Cannot Add to user cart", err);
      });
  }

  async function RemoveProductFromCart(uid, index) {
    console.log("???", uid, index);
    const docRef = doc(FIREBASE_FIRESTORE, `${PathString}/${uid}`);
    const tempArr = CurrentUser !== null ? CurrentUser.cart : [];

    let arr = tempArr.filter((e) => e.id != index);
    console.log("ARR", arr);

    return await updateDoc(docRef, { cart: arr });
  }

  //access values we want to use
  const value = {
    CurrentUser,
    LoginEmailPass,
    RegisterEmaillPass,
    Logout,
    // forgotPassword,
    //resetpassword,
    SignInWithGoogle,
    SignInAnon,
    CreateNewUser,
    AddProductToCart,
    RemoveProductFromCart
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
