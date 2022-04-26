// import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { doc, collection, query, where, getDocs, getDoc, setDoc } from "firebase/firestore";

// const PathString = "USERS";
// //sign up usign email and password
// export function RegisterEmaillPass(email, password) {
//   //firebase call that handles the auth of a new user signing up on our site. this call returns a Promise of type FirebaseUser
//   return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
// }

// //Sign in
// export function LoginEmailPass(email, password) {
//   return signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
// }

// //logout and redirects to homepage
// export function Logout() {
//   signOut(FIREBASE_AUTH);
//   window.location.replace("/");
// }

// //Sign in with Google
// export function SignInWithGoogle() {
//   //provider - the way we coms with firebase to know how to login
//   const provider = new GoogleAuthProvider();
//   //firebase function that allows us to login with google via a pop up screen
//   return signInWithPopup(FIREBASE_AUTH, provider);
// }

// //Sign in Anonymously
// export function SignInAnon() {
//   return signInAnonymously(FIREBASE_AUTH);
// }

// //Create a new user from Register other functions to co run while it is running
// //async(asycronious) - allows
// export async function CreateNewUser(uid, user) {
//   //  checks that the user exists
//   const isUser = user !== undefined && user !== null ? true : false;
//   //  checks if the user has a display name
//   const dn = isUser && user.displayName !== null ? user.displayName : "";

//   //the new user object we want to create
//   const payload = {
//     displayName: dn.length > 0 ? dn : "",
//     email: isUser ? user.email : "",
//     profileUrl: isUser && user.profileUrl ? user.profileUrl : "",
//     uid: uid,
//     role: "user"
//   };

//   //  FIREBASE    FIRESTORE  IMPLEMENTATION
//   const Ref = collection(FIREBASE_FIRESTORE, PathString);
//   const docRef = doc(FIREBASE_FIRESTORE, PathString, uid);

//   //same structure as an sql query
//   const q = query(Ref, where("uid", "==", `${uid}`));
//   const querySnapshot = await getDocs(q);
//   console.log("q", q, "qs", querySnapshot); // .docs.length

//   // checks that user does not exist in our db
//   if (querySnapshot.docs.length == 0) {
//     //create a db entry
//     await setDoc(docRef, payload)
//       .then((res) => {
//         console.log("Created new user entry in db", res);
//       })
//       .catch((err) => {
//         console.log("ERROR cannot create new user entry in db ", err);
//       });
//   }
// }

//checking auth state of a user after sign in/up
// export function GetAuthState() {
//   //local variable that we init with "" values
//   return new Promise((resolve, reject) => {
//     let returnUser = {
//       displayName: "",
//       email: "",
//       profileUrl: "",
//       uid: "",
//       role: ""
//     };

//     // firebase function
//     return onAuthStateChanged(FIREBASE_AUTH, async function (user) {
//       console.log("Give us the onAuthStateChanged user", user); //will be null OR firebaseUser

//       //if logged in will not be null
//       if (user !== null) {
//         const Ref = collection(FIREBASE_FIRESTORE, "USERS");
//         const q = query(Ref, where("uid", "==", `${user.uid}`));

//         const querySnapshot = await getDocs(q);
//         console.log("qs", querySnapshot.docs.length);

//         if (querySnapshot.docs.length == 0) {
//           console.log("anon => getAuth => query => return [] => We are here");
//           //user does not exist, lets create user
//           CreateNewUser(user.uid, user)
//             .then(() => {
//               //create our return value
//               returnUser = {
//                 displayName: user.displayName.length > 0 ? user.displayName : "",
//                 email: user.email ? user.email : "",
//                 profileUrl: "", //(Google)
//                 uid: user.uid,
//                 role: "user"
//               };
//               console.log("created user entry in out=r db and will now resolve our promise");
//               return resolve(returnUser);
//             })
//             .catch((err) => {
//               //error somewhere
//               reject(`Error occured here: ${err}`);
//             });
//         } else {
//           //here we return our user value
//           console.log("anon => getAuth => query => return does exist entry => We are here to fill local variable");
//           returnUser = {
//             displayName: user.displayName && user.displayName.length > 0 ? user.displayName : "",
//             email: user.email ? user.email : "",
//             profileUrl: "", //(Google)
//             uid: user.uid,
//             role: "user"
//           };
//           console.log("Now resolving promise");
//           return resolve(returnUser);
//         }
//         //got to return one level up again
//         resolve(returnUser);
//       }
//     });
//     // return returnUser;
//   });
// }
