import React from "react";
import NavBar from "../../components/NavBar";
import RegisterForm from "../../components/RegisterForm";
/* form=>
    email & password
    bonus ensure pass confirm password field
    stop user from using sign uo if passwords do not match
    form validation

*/

export default function SignUp() {
  return (
    <div>
      <NavBar />
      <RegisterForm />
    </div>
  );
}
