import SplashFooter from "./footer";
import { Tile1, Tile2, Tile3, Tile4 } from "./tiles";
import NavBar from "./navbar";
import "./splash.css";

const Splash = () => {
  return (
    <div className="splash">
      <NavBar />
      <Tile1 />
      <Tile2 />
      <Tile3 />
      <Tile4 />
      <SplashFooter />
    </div>
  );
};

export default Splash;
