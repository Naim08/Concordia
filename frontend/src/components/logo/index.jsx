import { Link } from "react-router-dom";
import "./logo.css";
import logo from "../../assets/discord_logo.png";

const LogoComponent = () => {
  return (
    <Link to="/">
      <img className="main-logo" src={logo} alt="Discord Logo" />
    </Link>
  );
};

export default LogoComponent;
