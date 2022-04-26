import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
// import { GetAuthState, Logout } from "../firebase/FirebaseAuth";
import { AllRoutes, RoutesObj } from "../routes/AllRoutes";
import { useAuth } from "../firebase/FirebaseAuthHook";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function NavBar() {
  const [currUserLocal, setcurrUserLocal] = useState(null);

  const { Logout, CurrentUser } = useAuth();

  useEffect(() => {
    if (CurrentUser !== null && CurrentUser !== undefined) {
      setcurrUserLocal({ displayName: CurrentUser?.displayName, email: CurrentUser?.email, profileUrl: CurrentUser?.profileUrl, uid: CurrentUser?.uid, role: CurrentUser?.role });
    } else {
      setcurrUserLocal(null);
    }
  }, [CurrentUser]);

  //life cycle hook for functional classes
  // useEffect(() => {
  //   GetAuthState()
  //     .then((value) => {
  //       if (value && value.uid && value.uid.length > 0) {
  //         console.log("user is signed in and valid ", value);
  //         setcurrUser(value);
  //       } else {
  //         console.log("user is signed out and no longer valid ", value);
  //         setcurrUser({ displayName: "", email: "", profileUrl: "", uid: "", role: "" });
  //       }
  //     })
  //     .catch((err) => {});
  // }, [GetAuthState()]);

  function displaySeperate() {
    return Object.values(RoutesObj.visual).map((line, index) => {
      if (line.name === RoutesObj.visual.shop.name) {
        return (
          <NavLink className="naV" key={index} to={line.path}>
            {line.name}
          </NavLink>
        );
      } else {
        return NavOnAuth(line, index);
        // return (
        //   <NavLink className="nav" key={index} to={line.path}>
        //     {line.name}
        //   </NavLink>
        // );
      }
    });
  }

  function NavOnAuth(line, index) {
    if (currUserLocal?.uid?.length > 0 && line.name === RoutesObj.visual.sign_in.name) {
      return <React.Fragment key={index}></React.Fragment>;
    } else if (currUserLocal?.uid?.length > 0 && line.name === RoutesObj.visual.sign_up.name) {
      return <React.Fragment key={index}></React.Fragment>;
    } else {
      return (
        <NavLink className="nav" key={index} to={line.path}>
          {line.name}
        </NavLink>
      );
    }
    // return Object.values(RoutesObj.visual).map((entry, index) => {
    //   if (currUserLocal && currUserLocal.uid && currUserLocal.uid.length > 0) {
    //     return (
    //       <React.Fragment key={index}>
    //         {entry.name === RoutesObj.visual.sign_in.name || entry.name === RoutesObj.visual.sign_up.name ? (
    //           <React.Fragment key={index}></React.Fragment>
    //         ) : (
    //           <NavLink className="nav" key={index} to={entry.path}>
    //             {entry.name}
    //           </NavLink>
    //         )}
    //       </React.Fragment>
    //     );
    //   } else {
    //     return (
    //       <NavLink className="nav" key={index} to={entry.path}>
    //         {entry.name}
    //       </NavLink>
    //     );
    //   }
    // });
  }

  return (
    <nav className="navigation">
      {displaySeperate()}
      {currUserLocal?.uid?.length > 0 && (
        <button
          onClick={() => {
            Logout();
          }}>
          <LogoutRoundedIcon />
        </button>
      )}
    </nav>
  );
}
