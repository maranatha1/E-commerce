import React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Form from "../utilities/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/FirebaseAuthHook";
import { RoutesObj } from "../routes/AllRoutes";
import Footer from "./Footer";
// import { CreateNewUser, RegisterEmaillPass } from "../firebase/FirebaseAuth";

export default function RegisterForm() {
  const { RegisterEmaillPass, CreateNewUser } = useAuth();
  let navigate = useNavigate();

  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConfirmPassword] = useState("");
  const [validate, setValidate] = useState({});

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //validate form
  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 10
      }
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors
      });

      isValid = false;
    }
    return isValid;
  };

  //handles submit
  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      RegisterEmaillPass(email, password)
        //do firebase auth call here for signup
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Sign up a success we received:", user);

          const userPayload = {
            displayName: user.displayName,
            email: user.email,
            profileUrl: user.profileUrl,
            uid: user.uid
          };
          // save user to firebase db in order to access that user's info
          CreateNewUser(user.uid, user).then(() => {
            alert("User Successfully Registered ");
            navigate(RoutesObj.visual.shop.path, { replace: true });
            setValidate({});
            setEmail("");
            setPassword("");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("an error has occured: ", errorCode, errorMessage);
        });
    }
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handlePassword2 = (e) => {
    setConfirmPassword(e.target.value);
    setSubmitted(false);
  };

  return (
    <div className="form">
      <h2>User Registration</h2>

      <div className="auth-form-container text-start">
        <form className="auth-form" method="POST" onSubmit={register} autoComplete={"off"}>
          <div className="email mb-3">
            <label className="label">Email:</label>
            <input
              className={`form-control ${validate.validate && validate.validate.email ? "is-invalid " : ""}`}
              onChange={handleEmail}
              className="input"
              value={email}
              type="email"
              placeholder="Enter email"
            />

            <div className={`invalid-feedback text-start ${validate.validate && validate.validate.email ? "d-block" : "d-none"}`}>
              {validate.validate && validate.validate.email ? validate.validate.email[0] : ""}
            </div>
          </div>

          <div className="password mb-3">
            <label className="label">Password:</label>
            <div className="input-group">
              <input
                className={`form-control ${validate.validate && validate.validate.password ? "is-invalid " : ""}`}
                onChange={handlePassword}
                className="input"
                value={password}
                type="password"
                placeholder="Enter password"
              />

              <div className={`invalid-feedback text-start ${validate.validate && validate.validate.password ? "d-block" : "d-none"}`}>
                {validate.validate && validate.validate.password ? validate.validate.password[0] : ""}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="label"> Confirm Password:</label>
            <input
              className={`form-control ${validate.validate && validate.validate.password ? "is-invalid " : ""}`}
              onChange={handlePassword2}
              className="input"
              value={conpassword}
              type="password"
              placeholder="Confirm password"
            />

            <div className={`invalid-feedback text-start ${validate.validate && validate.validate.password ? "d-block" : "d-none"}`}>
              {validate.validate && validate.validate.password ? validate.validate.password[0] : ""}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
            Register
          </button>
        </form>
      </div>

      <div className="container">
        Have an account?{" "}
        <Link className="text-link" href="/login">
          Sign in
        </Link>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}
