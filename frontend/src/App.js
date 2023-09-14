import { useSelector, useDispatch } from "react-redux";
import "./app.css";

import { useState, useContext, useEffect } from "react";
import SignUpForm from "./components/signup";
import { fetchUser } from "./store/user";
import LoginForm from "./components/login";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/splash";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Splash />} />

        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
