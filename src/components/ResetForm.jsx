import React from "react";
import { useState } from "react";
import Form from "../utilities/Form";
import Footer from "./Footer";

export default function ResetForm() {
  const [email, setEmail] = useState("");
  const [validate, setValidate] = useState({});

  const validateresetPassword = () => {
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

  const resetPassword = (e) => {
    e.preventDefault();

    const validate = validateresetPassword();

    if (validate) {
      alert("Reset password link is sent to " + email);
      setValidate({});
      setEmail("");
    }
  };

  return (
    <div className="form">
      <div>
        <h2>Reset Password:</h2>
      </div>
      <form method="POST" onSubmit={resetPassword} autoComplete={"off"}>
        <input
          type="email"
          // className={`input ${validate.validate && validate.validate.email ? "is-invalid " : ""}`}
          id="email"
          name="email"
          value={email}
          placeholder="New Password"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={`invalid-feedback text-start ${validate.validate && validate.validate.email ? "d-block" : "d-none"}`}>
          {validate.validate && validate.validate.email ? validate.validate.email[0] : ""}
        </div>

        <input
          type="email"
          // className={`input ${validate.validate && validate.validate.email ? "is-invalid " : ""}`}
          id="email"
          name="email"
          value={email}
          placeholder="Retype Password"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={`invalid-feedback text-start ${validate.validate && validate.validate.email ? "d-block" : "d-none"}`}>
          {validate.validate && validate.validate.email ? validate.validate.email[0] : ""}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 theme-btn mx-auto">
            Set Password
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
