import './Unsupported.css';
import UnsupportedIcon from '../assets/unsupported.png';
import {analytics} from '../firebase';
import {useEffect} from 'react';

function Unsupported() {
	
	useEffect(()=> {
		analytics.logEvent('screen_size_not_supported');
	}, []);
	
	return (
		<div className="unsupported">
			<img src={UnsupportedIcon} />
			<span>
				<h1>Shoot! We support desktop devices only.</h1>
				<p>We want to give you the best user experience. So please use a device with a larger display, possibly greater than 1024px.</p>
			</span>
		</div>
	);
}

export default Unsupported;