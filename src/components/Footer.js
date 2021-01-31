import './Footer.css';
import {useEffect, useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import {useStateValue} from '../StateProvider';
import {SkipNextRounded, SkipPreviousRounded, RefreshRounded} from '@material-ui/icons';

function Footer() {
	
	const history = useHistory();
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState([]);
	const [nextAvailable, setNextAvailable] = useState(false);
	const [prevAvailable, setPrevAvailable] = useState(false);
	const [{time}] = useStateValue();
	
	useEffect(() => {
		setCurrentPath(location.pathname.split('/'));
		setNextAvailable(location.pathname.split('/')[3] < 5);
		setPrevAvailable(location.pathname.split('/')[3] > 1);
	}, [location]);
	
	const nextQuest = () => {
		if (currentPath.length === 4 && nextAvailable) {
			history.push(`/lvl/${currentPath[2]}/${parseInt(currentPath[3])+1}`);
		}
	}
	
	const prevQuest = () => {
		if (currentPath.length === 4 && prevAvailable) {
			history.push(`/lvl/${currentPath[2]}/${parseInt(currentPath[3])-1}`);
		}
	}
	
	return (
		<div className="footer">
			<div className="footer__refresh" onClick={()=> window.location.reload()}>
				<RefreshRounded /> Reload
			</div>
			<div className="footer__timer">
				<LinearProgress variant="determinate" value={parseInt((-time/1800)*100)} />
				<span class="footer__clock">{~~(-time/60)}:{-time%60}<small> /30:00</small></span>
			</div>
			<div className="footer__buttons">
				<button onClick={prevQuest} disabled={!prevAvailable}><SkipPreviousRounded/></button>
				<button onClick={nextQuest} disabled={!nextAvailable}><SkipNextRounded/></button>
			</div>
		</div>
	);
}

export default Footer;