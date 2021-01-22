import './Sidebar.css';
import {useEffect, useState} from 'react';
import SHLogo from '../assets/logo_sh.png';
import BulbOn from '../assets/bulb_on.png';
import BulbOff from '../assets/bulb_off.png';
import {AccessTimeRounded, LockOutlined} from '@material-ui/icons';

function Sidebar() {
	
  return (
    <div className="sidebar">
    	<img src={SHLogo} className="sidebar__logo" />
    	<ul className="sidebar__levels">
    		<li className="active"><AccessTimeRounded /> Level 1</li>
    		<li className="locked"><LockOutlined /> Level 2</li>
    		<li className="locked"><LockOutlined /> Level 3</li>
    	</ul>
    	<p className="sidebar__info">New levels unlock on completion of current level.</p>
    	<div className="sidebar__hints">
    		<h4>Feeling stuck!?</h4>
    		<p>You are given a total of only three hints for the entire contest. Use wisely.</p>
    		<div className="sidebar__hintsImg">
    			<img className="hintUsed" src={BulbOff} />
    			<img src={BulbOn} />
    			<img src={BulbOn} />
    		</div>
    	</div>
    </div>
  );
}

export default Sidebar;
