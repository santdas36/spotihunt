import './Footer.css';
import {useEffect, useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import {SkipNextRounded, SkipPreviousRounded, RefreshRounded} from '@material-ui/icons';

function Footer() {
	
	const history = useHistory();
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState([]);
	const [nextAvailable, setNextAvailable] = useState(false);
	const [prevAvailable, setPrevAvailable] = useState(false);
	
	useEffect(() => {
		setCurrentPath(location.pathname.split('/'));
		setPrevAvailable(parseInt(currentPath[4]) > 1);
		setNextAvailable(parseInt(currentPath[4]) < 5)
	}, [location.pathname]);
	
	const nextQuest = () => {
		if (currentPath.length === 5 && nextAvailable) {
			history.push(`/l/${currentPath[2]}/q/${parseInt(currentPath[4])+1}`);
		}
	}
	
	const prevQuest = () => {
		if (currentPath.length === 5 && prevAvailable) {
			history.push(`/l/${currentPath[2]}/q/${parseInt(currentPath[4])-1}`);
		}
	}
	
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
				<button onClick={prevQuest}><SkipPreviousRounded/></button>
				<button onClick={nextQuest}><SkipNextRounded/></button>
			</div>
		</div>
	);
}

export default Footer;