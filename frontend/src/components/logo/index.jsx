import { Link } from "react-router-dom";
import { useContext } from "react";
import "./logo.css";
import logo from "../../assets/discord_logo.png";
import logo2 from "../../assets/icons8-discord-128.svg";

const LogoComponent = () => {
  return (
    <Link to="/" className="concordia-logo">
      <img className="main-logo" src={logo2} alt="Discord Logo" />
      <span className="logo-text">Concordia</span>
    </Link>
  );
};

export default LogoComponent;
