import './QuestNav.css';
import {NavLink, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';

function QuestNav() {
	const location = useLocation();
	const [currLocation, setCurrLocation] = useState();
	
	useEffect(() => {
		let splt = location.pathname.split('/');
		splt.pop();
		if (splt.length === 3) {
			setCurrLocation(splt.join('/'));
		}	
	}, [location]);
	
  return (
    <div className="questnav">
    	<NavLink activeClassName="active" to={`${currLocation}/1`}>1</NavLink>	
    	<NavLink activeClassName="active" to={`${currLocation}/2`}>2</NavLink>
    	<NavLink activeClassName="active" to={`${currLocation}/3`}>3</NavLink>
    	<NavLink activeClassName="active" to={`${currLocation}/4`}>4</NavLink>
    	<NavLink activeClassName="active" to={`${currLocation}/5`}>5</NavLink>
    </div>
  );
}

export default QuestNav;
