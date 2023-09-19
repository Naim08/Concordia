import "./tile.css";
import backgroundImg from "../../assets/splashbackground1.svg";
import shoes from "../../assets/shoes.svg";
import sipping from "../../assets/sipping.svg";
import channels from "../../assets/channels.svg";
import voice_channel from "../../assets/voice_channel.svg";
import tile4 from "../../assets/tile4.svg";
import star from "../../assets/star.svg";
import kickingShoes from "../../assets/kicking_shoes.svg";

const Tile1 = () => {
  return (
    <div className="tile1-holder tile-container">
      <img
        src={backgroundImg}
        className="tile1-background1"
        alt="mountains-background"
      />
      <div className="tile1-text">
        <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can find friends for a gaming group, join a small,
          disorganized juggling cult, or be part of a worldwide coding
          community. Where just you and a few friends named David can spend time
          together. A place that makes it easy to talk and hang out more often.
        </p>
      </div>

      <img
        src={kickingShoes}
        className="tile1-shoes"
        alt="characters-in-shoes"
      />
      <img
        src={sipping}
        className="tile1-sipping"
        alt="characters-sipping-drinks"
      />
    </div>
  );
};

const Tile2 = () => {
  return (
    <div className="tile2-holder tile-container">
      <img className="tile2-image" src={channels} alt="channel demo" />
      <div className="tile2-text">
        <h3>Create a place where you belong</h3>
        <p>
          This Discord clone allows users to create servers which are organized
          into topic-based channels where they can collaborate and share ideas
          without clogging up a group chat.
        </p>
      </div>
    </div>
  );
};

const Tile3 = () => {
  return (
    <div className="tile3-holder tile-container">
      <div className="tile3-text">
        <h3>Where live chat happens with WebSockets</h3>
        <p>
          Instantly communicate with your community in real time using
          WebSockets connected to the Rails backend via Action Cable
        </p>
      </div>
      <img
        className="tile3-image"
        src={voice_channel}
        alt="voice channel demo"
      />
    </div>
  );
};

const Tile4 = () => {
  return (
    <div className="tile4-holder tile-container">
      <div className="tile4-text">
        <h3>RELIABLE TECH FOR STAYING CLOSE</h3>
        <p>
          Low-latency voice and video feels like you’re in the same room. Wave
          hello over video, watch friends stream their games, or gather up and
          have a drawing session with screen share.
        </p>
      </div>

      <img className="tile4-image" src={tile4} alt="voice channel demo" />
      <div className="tile4-footer">
        <div className="tile4-footer-text">
          <h3>Ready to start your journey?</h3>
          <img className="tile4-footer-star" src={star} alt="star" />
          <button className="tile4-footer-button">Sign Up Now</button>
        </div>
      </div>
    </div>
  );
};

export { Tile1, Tile2, Tile3, Tile4 };
