import React from "react";
import { useState } from "react";
import GoogleButton from "react-google-button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Form from "../utilities/Form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/FirebaseAuthHook";
import { RoutesObj } from "../routes/AllRoutes";
import Footer from "./Footer";
// import { CreateNewUser, GetAuthState, LoginEmailPass, SignInAnon, SignInWithGoogle } from "../firebase/FirebaseAuth";

export default function LoginForm() {
  const { CreateNewUser, LoginEmailPass, SignInAnon, SignInWithGoogle } = useAuth();
  // const { history } = useNavigate();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //validate form '
  const validateLogin = () => {
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

  const authenticate = (e) => {
    e.preventDefault();

    const validate = validateLogin();

    if (validate) {
      LoginEmailPass(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Signed in successfully:", user);
          CreateNewUser(user.uid, user).then(() => {
            alert("Successful Login");
            // history.push(RoutesObj.visual.shop.path);
            navigate(RoutesObj.visual.shop.path, { replace: true });
            setValidate({});
            setEmail("");
            setPassword("");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("ERROR occired: ", errorCode, errorMessage);
        });
    }
  };

  function googleBtn() {
    SignInWithGoogle()
      //result from that action
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Sign in/up successful ", user);
        CreateNewUser(user.uid, user).then(() => {
          // history.push(RoutesObj.visual.shop.path);
          navigate(RoutesObj.visual.shop.path, { replace: true });
        });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;

        console.log("ERROR: ", errorCode, errorMessage);
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function anonBtn() {
    SignInAnon()
      .then((result) => {
        const user = result.user;
        console.log("Signed in/up successfully ", user);
        //
        CreateNewUser(user.uid, user).then(() => {
          // history.push(RoutesObj.visual.shop.path);
          navigate(RoutesObj.visual.shop.path, { replace: true });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR: ", errorCode, errorMessage);
      });
    //   .then(() => {
    //     // Signed in..
    //     console.log("Signed in/up");
    //     GetAuthState()
    //       .then((value) => {
    //         console.log("Resolved value at the end: ", value);
    //       })
    //       .catch((err) => {
    //         console.log("Resolved value at the end: ", err);
    //       });
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log("ERROR: ", errorCode, errorMessage);
    //   });
  }

  const errors = {
    email: "invalid email",
    pass: "invalid password"
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

  return (
    <div>
      <h2>Login</h2>

      <div className="form">
        <form className="auth-form" method="POST" onSubmit={authenticate} autoComplete={"off"}>
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

          <div className="input-group">
            <label className="label">Password:</label>
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

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
              Log In
            </button>
          </div>
        </form>
      </div>

      <Divider>OR</Divider>
      <br />

      <div className=" center-container">
        <GoogleButton
          onClick={() => {
            googleBtn();
          }}
        />
      </div>
      <br />

      <div className="text-center center-container">
        <button
          className="btn"
          variant="outlined"
          onClick={() => {
            anonBtn();
          }}>
          Sign in Anonymously
        </button>
      </div>

      <div className="container">
        <Link href="/forgot" variant="body2">
          Forgot password?
        </Link>{" "}
        <br />
        Don't have an account? <Link href="/register">Register</Link>
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
