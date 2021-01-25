import './QuestNav.css';
import {NavLink, useLocation} from 'react-router-dom';
import {useState} from 'react';

function QuestNav() {
	const location = useLocation();
	const [currLocation, setCurrLocation] = useState();
	
	useEffect(() => {
		let splt = location.pathname.split('/');
		splt.pop();
		console.log(splt.join('/'));
	}, [location]);
	
  return (
    <div className="questnav">
    	<NavLink activeClassName="active" to='/lvl/1/1'></NavLink>	
    	<NavLink activeClassName="active" to='/lvl/1/2'></NavLink>
    	<NavLink activeClassName="active" to='/lvl/1/3'></NavLink>
    	<NavLink activeClassName="active" to='/lvl/1/4'></NavLink>
    	<NavLink activeClassName="active" to='/lvl/1/5'></NavLink>
    </div>
  );
}

export default QuestNav;
