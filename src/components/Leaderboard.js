import './Leaderboard.css';
import {useEffect, useState} from 'react';
import {ReactComponent as TrophyIcon} from '../assets/trophy.svg';
import {useStateValue} from '../StateProvider';
import {auth} from '../firebase';
import FlipMove from 'react-flip-move';

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
    	<ul layout className="leaderboard__teams">
    		<FlipMove typeName={null}>
    		{
    			leaderboard?.map((team, index)=> (
    				<li key={team.id} className={team.id===user?.teamname ? 'active' : ''}>
    					{index < 3 ?
    						(<TrophyIcon />) :
    						(<span className="leaderboard__rank">{index+1}</span>)
    					}
    					<span className="leaderboard__teamname">{team.id}</span>
    					<span className="leaderboard__score">{team.data().score}<small>/15</small></span>
    				</li>
    			))
    		}
    		</FlipMove>
    	</ul>
    </div>
  );
}

export default Leaderboard;
