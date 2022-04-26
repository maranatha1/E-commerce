import React from "react";
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/NavBar";

/* 
google button
anom button
form = email & password input x2
form validation
*/
export default function SignIn() {
  return (
    <div>
      <NavBar />
      <LoginForm />
    </div>
  );
}
