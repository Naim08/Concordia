import "./MessageItem.css";

const TimeDivider = ({ date }) => {
  return (
    <div className="time-divider">
      <div className="divider-border" />
      <div className="divider-date">{date}</div>
    </div>
  );
};

export default TimeDivider;
