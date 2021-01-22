import './Footer.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import {SkipNextRounded, SkipPreviousRounded, RefreshRounded} from '@material-ui/icons';

function Footer() {
	return (
		<div className="footer">
			<div className="footer__refresh">
				<RefreshRounded /> Reload
			</div>
			<div className="footer__timer">
				<LinearProgress variant="determinate" value={parseInt((17.36/30)*100)} />
				<span class="footer__clock">17:36<small> /30:00</small></span>
			</div>
			<div className="footer__buttons">
				<button><SkipPreviousRounded/></button>
				<button><SkipNextRounded/></button>
			</div>
		</div>
	);
}

export default Footer;