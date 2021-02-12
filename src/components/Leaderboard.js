import './Leaderboard.css';
import {useEffect, useState} from 'react';
import {ReactComponent as TrophyIcon} from '../assets/trophy.svg';
import {useStateValue} from '../StateProvider';
import {auth} from '../firebase';
import {motion} from 'framer-motion';
import {vars} from '../vars';

function Leaderboard() {
	const [{user, leaderboard}] = useStateValue();
	const [maxScore, setMaxScore] = useState(0);
	
	useEffect(()=> {
		setMaxScore(parseInt(vars.quests)*parseInt(vars.levels));
	}, []);
	
  return (
    <div className="leaderboard">
    	<div className="leaderboard__header">
    		<span className="header__name">
				<small>YOUR TEAM</small>
				<p>{user?.teamname}</p>
			</span>
			<img className="header__icon" src={user?.photoURL} />
			<button className="header__logout" onClick={()=> auth.signOut()}>Sign Out</button>
    	</div>
    	<h3>Leaderboard</h3>
    	<ul layout className="leaderboard__teams">
    		{
    			leaderboard?.map((team, index)=> (
    				<motion.li layout key={team.id} layoutId={team.id} className={team.id===user?.teamname ? 'active' : ''}>
    					{index < 3 ?
    						(<TrophyIcon />) :
    						(<span className="leaderboard__rank">{index+1}</span>)
    					}
    					<span className="leaderboard__teamname">{team.id}</span>
    					<span className="leaderboard__score">{team.data().score}<small>/{maxScore}</small></span>
    				</motion.li>
    			))
    		}
    	</ul>
    </div>
  );
}

export default Leaderboard;
