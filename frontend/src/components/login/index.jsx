import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import "./login.css";
import ModalBackground from "../modalbackground";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector((state) => state.session.currentUser);
  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors([]);
    try {
      await dispatch(login({ credential, password }));
      setPassword("");
      setCredential("");
    } catch (err) {
      setErrors(err.errors);
    }
  };

  const createLabelUsername = () => {
    if (errors.length > 0) {
      return (
        <label htmlFor="credential-input" className="login-error">
          USERNAME OR EMAIL{" "}
          <p className="login-error">&nbsp;&ndash; {errors[0]}</p>
        </label>
      );
    } else {
      return (
        <label htmlFor="credential-input">
          USERNAME OR EMAIL
          <p className="login-error">&nbsp;*</p>
        </label>
      );
    }
  };

  const createLabelPassword = () => {
    if (errors.length > 0) {
      return (
        <label htmlFor="password-input" className="login-error">
          PASSWORD <p className="login-error">&nbsp;&ndash; {errors[0]}</p>
        </label>
      );
    } else {
      return (
        <label htmlFor="password-input">
          PASSWORD <p className="login-error">&nbsp;*</p>
        </label>
      );
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();

    setErrors([]);
    try {
      await dispatch(login({ credential: "demo-login", password: "password" }));
      setPassword("");
      setCredential("");
    } catch (err) {
      setErrors(err.errors);
    }
  };

  const demoLogin2 = async (e) => {
    e.preventDefault();

    setErrors([]);
    try {
      dispatch(login({ credential: "naim08", password: "password" }));
      setPassword("");
      setCredential("");
    } catch (err) {
      setErrors(err.errors);
    }
  };
  if (currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-modal-holder">
      <ModalBackground />
      <div className="login-modal">
        <h3>Welcome back!</h3>
        <p>We're so excited to see you again!</p>
        <form className="login-form" onSubmit={handleLogin}>
          {createLabelUsername()}
          <input
            id="credential-input"
            type="text"
            autoComplete="username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />

          {createLabelPassword()}
          <input
            id="password-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="#"> </Link>
          <br />
          <button>Log In</button>
          <div className="login-bottom">
            <p>
              Need an account? <Link to="/register">Register</Link>
            </p>
            <p>
              Login as <span onClick={demoLogin}>Demo User 1</span> or{" "}
              <span onClick={demoLogin2}>Demo User 2</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
