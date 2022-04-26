import React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Form from "../utilities/Form";
import Footer from "./Footer";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState({});

  const validateforgotPassword = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true
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

  const forgotPassword = (e) => {
    e.preventDefault();

    const validate = validateforgotPassword();

    if (validate) {
      alert("Reset password link is sent to " + email);
      setValidate({});
      setEmail("");
    }
  };

  return (
    <div className="form">
      <div>
        <h2>Forgot Password:</h2>
      </div>
      <form method="POST" onSubmit={forgotPassword} autoComplete={"off"}>
        <input
          type="email"
          className={`input ${validate.validate && validate.validate.email ? "is-invalid " : ""}`}
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={`invalid-feedback text-start ${validate.validate && validate.validate.email ? "d-block" : "d-none"}`}>
          {validate.validate && validate.validate.email ? validate.validate.email[0] : ""}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
            Submit
          </button>
        </div>
      </form>
      <br />
      <div className="container">
        Return to{" "}
        <Link className="text-link" href="/login">
          Login
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
