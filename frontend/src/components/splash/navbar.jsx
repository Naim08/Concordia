import { Link } from "react-router-dom";
import LogoComponent from "../logo";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, getCurrentUser } from "../../store/session";

const NavBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-holder">
        <LogoComponent />

        <div className="navbar-links">
          <Link to="https://github.com/Naim08" target="_blank">
            <i className="fa-brands fa-github fa-xl"></i>
            <div>Github</div>
          </Link>
          <Link to="https://www.linkedin.com/in/naimmiah/" target="_blank">
            <i className="fa-brands fa-linkedin fa-xl"></i>
            <div>LinkedIn</div>
          </Link>
          <Link to="https://wellfound.com/"  target="_blank">
            <i className="fa-brands fa-angellist fa-xl"></i>
            <div>Wellfound</div>
          </Link>
        </div>
        {currentUser ? (
          <Link to="/" className="navbar-login" onClick={handleClick}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="navbar-login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
