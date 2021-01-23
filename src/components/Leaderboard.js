import './Leaderboard.css';
import {useEffect, useState} from 'react';
import TrophyIcon from '../assets/trophy.svg';

function Leaderboard() {
	const arr = new Array(20);
	
  return (
    <div className="leaderboard">
    	<h3>Leaderboard</h3>
    	<ul className="leaderboard__teams">
    		{
    			arr.map((el,index)=> (
    				<li className={index===3 ? 'active' : ''}>
    					{index < 3 ?
    						(<TrophyIcon />) :
    						(<span className="leaderboard__rank">{index+1}</span>)
    					}
    					Team {index+1}<span className="leaderboard__score">12<small>/15</small></span>
    				</li>
    			))
    		}
    	</ul>
    </div>
  );
}

export default Leaderboard;
