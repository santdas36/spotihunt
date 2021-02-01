import './QuestNav.css';
import {NavLink, useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {vars} from '../vars';

function QuestNav() {
	const location = useLocation();
	const [currLocation, setCurrLocation] = useState();
	const questsArray = Array.from(Array(vars.quests)).map((e,i)=>i+1);
	
	useEffect(() => {
		let splt = location.pathname.split('/');
		splt.pop();
		if (splt.length === 3) {
			setCurrLocation(splt.join('/'));
		}	
	}, [location]);
	
  return (
    <div className="questnav">
    	{questsArray.map((i) => (
    		<NavLink activeClassName="active" to={`${currLocation}/i`}>{i}</NavLink>
    	))}
    </div>
  );
}

export default QuestNav;
