import "./footer.css";
import LogoComponent from "../logo";
import { Link } from "react-router-dom";

const SplashFooter = () => {
  return (
    <div className="splashfooter-holder">
      <div className="splashfooter-text">
        <div className="splashfooter-linkholder">
          <h3>Developer Links</h3>
          <ul>
            <li>
              <Link to={{ pathname: "https://github.com/" }} target="_blank">
                <i className="fa-brands fa-github fa-xl"></i>
                <div>Github</div>
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "https://www.linkedin.com/" }}
                target="_blank"
              >
                <i className="fa-brands fa-linkedin fa-xl"></i>
                <div>LinkedIn</div>
              </Link>
            </li>
            <li>
              <Link to={{ pathname: "https://wellfound.com/" }} target="_blank">
                <i className="fa-brands fa-angellist fa-xl"></i>
                <div>Wellfound</div>
              </Link>
            </li>
          </ul>
        </div>

        <hr className="footer-hr" />
        <div className="footer-bottom">
          <LogoComponent />
          <Link to="/signup" className="footer-signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashFooter;
