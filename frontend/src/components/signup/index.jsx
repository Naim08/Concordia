import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { signup, login } from "../../store/session";
import "./signup.css";

const SignUpForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const currentUser = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();
  if (currentUser) {
    return <Navigate to="/" />;
  }
  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const user = await dispatch(signup({ email, username, password }));
      setPassword("");
      setUsername("");
      setEmail("");
    } catch (err) {
      let tmpArr = Array(3).fill("");
      console.log(err);
      err.errors.forEach((error) => {
        if (error.includes("Email") && tmpArr[0] === "") {
          tmpArr[0] = error;
        } else if (error.includes("Username") && tmpArr[1] === "") {
          tmpArr[1] = error;
        } else if (error.includes("Password") && tmpArr[2] === "") {
          tmpArr[2] = error;
        }
      });
      setErrors(tmpArr);
    }
  };

  const createLabelEmail = () => {
    if (errors.length > 0 && errors[0] !== "") {
      return (
        <label htmlFor="email-input" className="signup-error">
          EMAIL<p className="signup-error">&nbsp;&ndash; {errors[0]}</p>
        </label>
      );
    } else {
      return (
        <label htmlFor="email-input">
          EMAIL <p className="signup-error">&nbsp;*</p>
        </label>
      );
    }
  };

  const createLabelUsername = () => {
    if (errors.length > 0 && errors[1] !== "") {
      return (
        <label htmlFor="username-input" className="signup-error">
          USERNAME<p className="signup-error">&nbsp;&ndash; {errors[1]}</p>
        </label>
      );
    } else {
      return (
        <label htmlFor="username-input">
          USERNAME <p className="signup-error">&nbsp;*</p>
        </label>
      );
    }
  };

  const createLabelPassword = () => {
    if (errors.length > 0 && errors[2] !== "") {
      return (
        <label htmlFor="password-input" className="signup-error">
          PASSWORD <p className="signup-error">&nbsp;&ndash; {errors[2]}</p>
        </label>
      );
    } else {
      return (
        <label htmlFor="password-input">
          PASSWORD <p className="signup-error">&nbsp;*</p>
        </label>
      );
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();

    setErrors([]);
    try {
      dispatch(login({ credential: "demo-login", password: "password" }));
      // clear input fields
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrors(err.errors);
    }
  };

  const demoLogin2 = async (e) => {
    e.preventDefault();

    setErrors([]);
    try {
      dispatch(login({ credential: "naim08", password: "password" }));
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <div className="signup-modal-holder">
      <div className="signup-modal">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={onSignUp}>
          {createLabelEmail()}
          <input
            id="email-input"
            type="text"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {createLabelUsername()}
          <input
            id="username-input"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {createLabelPassword()}
          <input
            id="password-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Continue</button>
          <div className="signup-bottom">
            <div className="signup-options-buttons">
              <p>
                <Link to="/login">Already have an account?</Link>
              </p>
              <p>
                Login as <span onClick={demoLogin}>Demo User 1</span> or{" "}
                <span onClick={demoLogin}>Demo User 2</span>
              </p>
            </div>
            <br />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
