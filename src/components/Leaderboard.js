import './Leaderboard.css';
import {useEffect, useState} from 'react';
import {ReactComponent as TrophyIcon} from '../assets/trophy.svg';
import {useStateValue} from '../StateProvider';
import {auth} from '../firebase';
import {motion} from 'framer-motion';

function Leaderboard() {
	const arr = Array.from(Array(20)).map((e,i)=>i+1);
	const [{user, leaderboard}] = useStateValue();
	
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
    	<motion.ul layout className="leaderboard__teams">
    		{
    			leaderboard?.map((team, index)=> (
    				<li layoutId={team.id} className={team.id===user?.teamname ? 'active' : ''}>
    					{index < 3 ?
    						(<TrophyIcon />) :
    						(<span className="leaderboard__rank">{index+1}</span>)
    					}
    					<span className="leaderboard__teamname">{team.id}</span>
    					<span className="leaderboard__score">{team.score}<small>/15</small></span>
    				</li>
    			))
    		}
    	</motion.ul>
    </div>
  );
}

export default Leaderboard;
