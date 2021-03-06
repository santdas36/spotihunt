import "./Footer.css";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useStateValue } from "../StateProvider";
import {
  SkipNextRounded,
  SkipPreviousRounded,
  RefreshRounded,
} from "@material-ui/icons";
import { vars } from "../vars";

function Footer() {
  const history = useHistory();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState([]);
  const [nextAvailable, setNextAvailable] = useState(false);
  const [prevAvailable, setPrevAvailable] = useState(false);
  const [{ time }] = useStateValue();

  useEffect(() => {
    setCurrentPath(location.pathname.split("/"));
    setNextAvailable(location.pathname.split("/")[3] < vars.quests);
    setPrevAvailable(location.pathname.split("/")[3] > 1);
  }, [location]);

  useEffect(() => {
    const muiProgressBar = document.querySelector(".MuiLinearProgress-bar");
    muiProgressBar.style.animationDelay = `${parseInt(
      (time / vars.duration) * 100
    )}s`;
  }, [time]);

  const nextQuest = () => {
    if (currentPath.length === 4 && nextAvailable) {
      history.push(`/lvl/${currentPath[2]}/${parseInt(currentPath[3]) + 1}`);
    }
  };

  const prevQuest = () => {
    if (currentPath.length === 4 && prevAvailable) {
      history.push(`/lvl/${currentPath[2]}/${parseInt(currentPath[3]) - 1}`);
    }
  };

  return (
    <div className="footer">
      <div className="footer__refresh" onClick={() => window.location.reload()}>
        <RefreshRounded /> Reload
      </div>
      <div className="footer__timer">
        <LinearProgress
          variant="determinate"
          value={
            -time < vars.duration
              ? parseInt((-time / vars.duration) * 100)
              : 100
          }
        />
        <span class="footer__clock">
          {~~(-time / 60)}:{-time % 60 < 10 && "0"}
          {-time % 60}
          <small>
            {" "}
            /{vars.duration / 60}:{vars.duration % 60 < 10 && "0"}
            {vars.duration % 60}
          </small>
        </span>
      </div>
      <div className="footer__buttons">
        <button onClick={prevQuest} disabled={!prevAvailable}>
          <SkipPreviousRounded />
        </button>
        <button onClick={nextQuest} disabled={!nextAvailable}>
          <SkipNextRounded />
        </button>
      </div>
    </div>
  );
}

export default Footer;
