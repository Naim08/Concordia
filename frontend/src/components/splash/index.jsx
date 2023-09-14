import SplashFooter from "./footer";
import { Tile1, Tile2, Tile3 } from "./tiles";
import NavBar from "./navbar";

const Splash = () => {
  return (
    <div className="splash">
      <NavBar />
      <Tile1 />
      <Tile2 />
      <Tile3 />
      <SplashFooter />
    </div>
  );
};

export default Splash;
