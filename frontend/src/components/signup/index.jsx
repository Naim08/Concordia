import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./signup.css";
import { getErrors, removeErrors } from "../../store/errors";
import { getCurrentUser, signup } from "../../store/session";
import { ModalBackground } from "../modal/modal";



const SignUpForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(getCurrentUser);
  const errors = useSelector(getErrors);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (errors) dispatch(removeErrors());

    return () => {
      if (errors) dispatch(removeErrors());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ email, username, password }));
  };

  if (sessionUser) return <Navigate to="/" />;

  return (
    <div className="form-wrapper">
      <ModalBackground />
      <div className="form-container">
        <form className="login-signup" onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>Create an account</h1>
          </div>
          <div className="form-body">
            <label htmlFor="email" className={errors?.email ? "error" : ""}>
              EMAIL
              {errors?.email ? (
                <span className="errorMessage"> - {errors.email}</span>
              ) : (
                <span className="required">*</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="username"
              className={errors?.username ? "error" : ""}
            >
              USERNAME
              {errors?.username ? (
                <span className="errorMessage"> - {errors.username}</span>
              ) : (
                <span className="required">*</span>
              )}
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className={errors?.password ? "error" : ""}
            >
              PASSWORD
              {errors?.password ? (
                <span className="errorMessage"> - {errors.password}</span>
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
            <button type="submit">Continue</button>
            <p>
              By registering, you agree to Discode's{" "}
              <Link to="/">Terms of Service</Link> and{" "}
              <Link to="/">Privacy Policy</Link>.
            </p>
            <div className="login-link">
              <Link to="/login">Already have an account?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
