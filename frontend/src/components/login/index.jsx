import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login, getCurrentUser } from "../../store/session";
import { getErrorStatus, getErrors, removeErrors } from "../../store/errors";
import "./login.css";
import ModalBackground from "../modalbackground";
import { getUnauthorized, setUnauthorized } from "../../store/ui";
// const LoginForm = () => {
// //   const dispatch = useDispatch();
// //   const [credential, setCredential] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState([]);
// //   const currentUser = useSelector((state) => state.session.currentUser);
// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     setErrors([]);
// //     try {
// //       await dispatch(login({ credential, password }));
// //       setPassword("");
// //       setCredential("");
// //     } catch (err) {
// //       setErrors(err.errors);
// //     }
// //   };

// //   const createLabelUsername = () => {
// //     if (errors.length > 0) {
// //       return (
// //         <label htmlFor="credential-input" className="login-error">
// //           USERNAME OR EMAIL{" "}
// //           <p className="login-error">&nbsp;&ndash; {errors[0]}</p>
// //         </label>
// //       );
// //     } else {
// //       return (
// //         <label htmlFor="credential-input">
// //           USERNAME OR EMAIL
// //           <p className="login-error">&nbsp;*</p>
// //         </label>
// //       );
// //     }
// //   };

// //   const createLabelPassword = () => {
// //     if (errors.length > 0) {
// //       return (
// //         <label htmlFor="password-input" className="login-error">
// //           PASSWORD <p className="login-error">&nbsp;&ndash; {errors[0]}</p>
// //         </label>
// //       );
// //     } else {
// //       return (
// //         <label htmlFor="password-input">
// //           PASSWORD <p className="login-error">&nbsp;*</p>
// //         </label>
// //       );
// //     }
// //   };

// //   const demoLogin = async (e) => {
// //     e.preventDefault();

// //     setErrors([]);
// //     try {
// //       await dispatch(login({ credential: "demo-login", password: "password" }));
// //       setPassword("");
// //       setCredential("");
// //     } catch (err) {
// //       setErrors(err.errors);
// //     }
// //   };

// //   const demoLogin2 = async (e) => {
// //     e.preventDefault();

// //     setErrors([]);
// //     try {
// //       dispatch(login({ credential: "naim08", password: "password" }));
// //       setPassword("");
// //       setCredential("");
// //     } catch (err) {
// //       setErrors(err.errors);
// //     }
// //   };
// //   if (currentUser) {
// //     return <Navigate to="/" />;
// //   }
// //   return (
// //     <div className="login-modal-holder">
// //       <ModalBackground />
// //       <div className="login-modal">
// //         <h3>Welcome back!</h3>
// //         <p>We're so excited to see you again!</p>
// //         <form className="login-form" onSubmit={handleLogin}>
// //           {createLabelUsername()}
// //           <input
// //             id="credential-input"
// //             type="text"
// //             autoComplete="username"
// //             value={credential}
// //             onChange={(e) => setCredential(e.target.value)}
// //           />

// //           {createLabelPassword()}
// //           <input
// //             id="password-input"
// //             type="password"
// //             autoComplete="current-password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />

// //           <Link to="#"> </Link>
// //           <br />
// //           <button>Log In</button>
// //           <div className="login-bottom">
// //             <p>
// //               Need an account? <Link to="/register">Register</Link>
// //             </p>
// //             <p>
// //               Login as <span onClick={demoLogin}>Demo User 1</span> or{" "}
// //               <span onClick={demoLogin2}>Demo User 2</span>
// //             </p>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;

const LoginForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(getCurrentUser);
  const errors = useSelector(getErrors);
  const errorStatus = useSelector(getErrorStatus);
  const unauthorized = useSelector(getUnauthorized);

  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (errors && errorStatus !== 401) dispatch(removeErrors());

    return () => {
      if (errors || errorStatus) dispatch(removeErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());
    if (unauthorized) dispatch(setUnauthorized(false));
    dispatch(login({ credential, password }));
  };

  const demoLogin = (e, user) => {
    e.preventDefault();
    if (errors) dispatch(removeErrors());
    if (unauthorized) dispatch(setUnauthorized(false));

    const credential = user === 1 ? "naim08@gmail.com" : "naim02@gmail.com";
    dispatch(login({ credential, password: "password123" }));
  };

  if (sessionUser) return <Navigate to="/home" />;

  return (
    <div className="form-wrapper">
      <ModalBackground />
      <div className="form-container">
        {unauthorized ? (
          <span className="unauthorized-message">
            Must be logged in or logged in elsewhere.
          </span>
        ) : null}

        <form className="login-signup" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Welcome back!</h1>
            <span>We're capy excited to see you again!</span>
          </div>
          <div className="form-body">
            <label htmlFor="email" className={errors?.login ? "error" : ""}>
              EMAIL OR USERNAME
              {errors?.login ? (
                <span className="error-message"> - {errors.login}</span>
              ) : (
                <span className="required">*</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <label htmlFor="password" className={errors?.login ? "error" : ""}>
              PASSWORD
              {errors?.login ? (
                <span className="error-message"> - {errors.login}</span>
              ) : (
                <span className="required">*</span>
              )}
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
            <div className="demo-container">
              <div className="demo-buttons-container">
                <button
                  className="demo-button"
                  onClick={(e) => demoLogin(e, 1)}
                >
                  Login Demo User 1 <br />
                </button>
                <button
                  className="demo-button"
                  onClick={(e) => demoLogin(e, 2)}
                >
                  Login Demo User 2 <br />
                </button>
              </div>
              <span className="demo-text">
                Login the other user on a different browser or incognito mode
              </span>
            </div>
            <span className="signup-link">
              Need an account? <Link to="/signup">Register</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
