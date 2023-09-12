import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import SignUpForm from "./components/signup";
import { fetchUser } from "./store/user";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
