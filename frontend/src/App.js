import { useSelector, useDispatch } from "react-redux";
import "./app.css";

import { useState, useContext, useEffect } from "react";
import SignUpForm from "./components/signup";
import { fetchUser } from "./store/user";
import LoginForm from "./components/login";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="app-container">
      <h1>My App</h1>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
