import { Link } from "react-router-dom";
import LogoComponent from "../logo";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-holder">
        <LogoComponent />

        <div className="navbar-links">
          <Link to={{ pathname: "https://github.com/" }} target="_blank">
            <i className="fa-brands fa-github fa-xl"></i>
            <div>Github</div>
          </Link>
          <Link to={{ pathname: "https://www.linkedin.com/" }} target="_blank">
            <i className="fa-brands fa-linkedin fa-xl"></i>
            <div>LinkedIn</div>
          </Link>
          <Link to={{ pathname: "https://wellfound.com/" }} target="_blank">
            <i className="fa-brands fa-angellist fa-xl"></i>
            <div>Wellfound</div>
          </Link>
        </div>
        <Link to="/login" className="navbar-login">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
