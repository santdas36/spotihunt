import './Leaderboard.css';
import {useEffect, useState} from 'react';
import {ReactComponent as TrophyIcon} from '../assets/trophy.svg';

function Leaderboard() {
	const arr = Array.from(Array(20)).map((e,i)=>i+1);
	console.log(arr);
	
  return (
    <div className="leaderboard">
    	<div className="leaderboard__header">
    		<span className="header__name">
				<small>YOUR TEAM</small>
				<p>Spotihunters007</p>
			</span>
			<img className="header__icon" src="https://avatars.dicebear.com/4.5/api/gridy/dkso.svg" />
    	</div>
    	<h3>Leaderboard</h3>
    	<ul className="leaderboard__teams">
    		{
    			arr.map((el,index)=> (
    				<li className={index===3 ? 'active' : ''}>
    					{index < 3 ?
    						(<TrophyIcon />) :
    						(<span className="leaderboard__rank">{index+1}</span>)
    					}
    					<span className="leaderboard__teamname">Team {index+1}</span>
    					<span className="leaderboard__score">12<small>/15</small></span>
    				</li>
    			))
    		}
    	</ul>
    </div>
  );
}

export default Leaderboard;
