import React from "react";
import NotFoundImage from "../../assets/404_Page.gif";
import "./notFound.css";
import NavBar from "../splash/navbar";
import "../splash/navbar.css";

const NotFound = () => {
  return (
    <>
      <div className="nav-bar-container">
        <NavBar />
      </div>
      <div className="not-found-container">
        <div className="not-found-text">
          <h1>WRONG TURN?</h1>
          <p>
            You look lost, stranger. You know what helps when you’re lost? A
            piping hot bowl of noodles. Take a seat, we’re frantically at work
            here cooking up something good. Oh, you need something to read?
            These might help you:
          </p>
          {/* You can add links or other content here */}
        </div>
        <div className="not-found-image">
          <img src={NotFoundImage} alt="Lost in Discord" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
