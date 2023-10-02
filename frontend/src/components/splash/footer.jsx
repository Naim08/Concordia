import "./footer.css";
import LogoComponent from "../logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";

const SplashFooter = () => {
  const currentUser = useSelector(getCurrentUser);
  return (
    <div className="splashfooter-holder">
      <div className="splashfooter-text">
        <div className="splashfooter-linkholder">
          <h3>Developer Links</h3>
          <ul>
            <li>
              <Link to= "https://github.com/Naim08" target="_blank">
                {/* <i className="fa-brands fa-github fa-xl"></i> */}
                <i class="fa-brands fa-github-alt fa-xl"></i>
                <div>Github</div>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/naimmiah/"
                target="_blank"
              >
                {/* <i className="fa-brands fa-linkedin fa-xl"></i> */}
                <i class="fa-brands fa-linkedin-in fa-xl"></i>
                <div>LinkedIn</div>
              </Link>
            </li>
            <li>
              <Link to="https://wellfound.com/" target="_blank">
                <i className="fa-brands fa-angellist fa-xl"></i>
                <div>Wellfound <span>Under Construction</span></div>
              </Link>
            </li>
          </ul>
        </div>

        <hr className="footer-hr" />
        <div className="footer-bottom">
          <LogoComponent />
          {!currentUser ? (
            <Link to="/signup" className="footer-signup">
              Sign up
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashFooter;
