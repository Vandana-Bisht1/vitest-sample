import React, { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsFormValid(
      validateEmail(e.target.value) && password.length > 0 && termsChecked
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsFormValid(
      validateEmail(email) && e.target.value.length > 0 && termsChecked
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsChecked(e.target.checked);
    setIsFormValid(
      validateEmail(email) && password.length > 0 && e.target.checked
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "abc") {
      alert("This password is not allowed.");
      return;
    }
    if (isFormValid) {
      setSubmitted(true);
    }
  };

  return (
    <div className="login-container">
      <form
        data-testid="login-form"
        onSubmit={handleSubmit}
        className="login-form"
      >
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="terms"
              checked={termsChecked}
              onChange={handleCheckboxChange}
            />
            Accept Terms and Conditions
          </label>
        </div>
        <button type="submit" disabled={!isFormValid} className="login-button">
          Login
        </button>
      </form>
      {submitted && (
        <p className="success-message">Form submitted successfully!</p>
      )}
    </div>
  );
};

export default Login;