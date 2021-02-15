import "./Countdown.css";

function Countdown({ time }) {
  const days = ~~(time / (24 * 60 * 60));
  const hours = ~~((time % (24 * 60 * 60)) / (60 * 60));
  const mins = ~~((time % (60 * 60)) / 60);
  const secs = ~~(time % 60);

  return (
    <div class="countdown">
      <span data-text="Days">
        {days < 10 && "0"}
        {days}
      </span>
      <span data-text="Hours">
        {hours < 10 && "0"}
        {hours}
      </span>
      <span data-text="Mins">
        {mins < 10 && "0"}
        {mins}
      </span>
      <span data-text="Secs">
        {secs < 10 && "0"}
        {secs}
      </span>
    </div>
  );
}

export default Countdown;
