import './Unsupported.css';
import UnsupportedIcon from '../assets/unsupported.png';

function Unsupported() {
	return (
		<div className="unsupported">
			<img src={UnsupportedIcon} />
			<span>
				<h1>Shoot! We support desktop devices only.</h1>
				<p>We want to give you the best user experience. So please use a device that has a larger screen width, possibly greater than 1024px.</p>
			</span>
		</div>
	);
}

export default Unsupported;