import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import "./signup.css";
import { getErrors, removeErrors } from "../../store/errors";
import { getCurrentUser, signup } from "../../store/session";
import { ModalBackground } from "../modal/modal";

// const SignUpForm = (props) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const currentUser = useSelector((state) => state.session.currentUser);
//   const dispatch = useDispatch();
//   if (currentUser) {
//     return <Navigate to="/" />;
//   }
//   const onSignUp = async (e) => {
//     e.preventDefault();
//     setErrors([]);
//     try {
//       const user = await dispatch(signup({ email, username, password }));
//       setPassword("");
//       setUsername("");
//       setEmail("");
//     } catch (err) {
//       let tmpArr = Array(3).fill("");
//       console.log(err);
//       err.errors.forEach((error) => {
//         if (error.includes("Email") && tmpArr[0] === "") {
//           tmpArr[0] = error;
//         } else if (error.includes("Username") && tmpArr[1] === "") {
//           tmpArr[1] = error;
//         } else if (error.includes("Password") && tmpArr[2] === "") {
//           tmpArr[2] = error;
//         }
//       });
//       setErrors(tmpArr);
//     }
//   };

//   const createLabelEmail = () => {
//     if (errors.length > 0 && errors[0] !== "") {
//       return (
//         <label htmlFor="email-input" className="signup-error">
//           EMAIL<p className="signup-error">&nbsp;&ndash; {errors[0]}</p>
//         </label>
//       );
//     } else {
//       return (
//         <label htmlFor="email-input">
//           EMAIL <p className="signup-error">&nbsp;*</p>
//         </label>
//       );
//     }
//   };

//   const createLabelUsername = () => {
//     if (errors.length > 0 && errors[1] !== "") {
//       return (
//         <label htmlFor="username-input" className="signup-error">
//           USERNAME<p className="signup-error">&nbsp;&ndash; {errors[1]}</p>
//         </label>
//       );
//     } else {
//       return (
//         <label htmlFor="username-input">
//           USERNAME <p className="signup-error">&nbsp;*</p>
//         </label>
//       );
//     }
//   };

//   const createLabelPassword = () => {
//     if (errors.length > 0 && errors[2] !== "") {
//       return (
//         <label htmlFor="password-input" className="signup-error">
//           PASSWORD <p className="signup-error">&nbsp;&ndash; {errors[2]}</p>
//         </label>
//       );
//     } else {
//       return (
//         <label htmlFor="password-input">
//           PASSWORD <p className="signup-error">&nbsp;*</p>
//         </label>
//       );
//     }
//   };
//   const demoLogin = async (e) => {
//     e.preventDefault();

//     setErrors([]);
//     try {
//       dispatch(login({ credential: "demo-login", password: "password" }));
//       // clear input fields
//       setEmail("");
//       setUsername("");
//       setPassword("");
//     } catch (err) {
//       setErrors(err.errors);
//     }
//   };

//   const demoLogin2 = async (e) => {
//     e.preventDefault();

//     setErrors([]);
//     try {
//       dispatch(login({ credential: "naim08", password: "password" }));
//       setEmail("");
//       setUsername("");
//       setPassword("");
//     } catch (err) {
//       setErrors(err.errors);
//     }
//   };

//   return (
//     <div className="signup-modal-holder">
//       <div className="signup-modal">
//         <h1>Sign Up</h1>
//         <form className="signup-form" onSubmit={onSignUp}>
//           {createLabelEmail()}
//           <input
//             id="email-input"
//             type="text"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           {createLabelUsername()}
//           <input
//             id="username-input"
//             type="text"
//             autoComplete="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           {createLabelPassword()}
//           <input
//             id="password-input"
//             type="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button>Continue</button>
//           <div className="signup-bottom">
//             <div className="signup-options-buttons">
//               <p>
//                 <Link to="/login">Already have an account?</Link>
//               </p>
//               <p>
//                 Login as <span onClick={demoLogin}>Demo User 1</span> or{" "}
//                 <span onClick={demoLogin}>Demo User 2</span>
//               </p>
//             </div>
//             <br />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;

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
