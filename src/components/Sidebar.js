import './Sidebar.css';
import {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import SHLogo from '../assets/logo_sh.png';
import BulbOn from '../assets/bulb_on.png';
import BulbOff from '../assets/bulb_off.png';
import {AccessTimeRounded, LockOutlined} from '@material-ui/icons';

function Sidebar() {
	
  return (
    <div className="sidebar">
    	<img src={SHLogo} className="sidebar__logo" />
    	<div className="sidebar__levels">
    		<NavLink activeClassName="active" to='/lvl/1'><AccessTimeRounded /> Level 1</NavLink>
    		<NavLink activeClassName="active" to='/lvl/2' className="locked"><LockOutlined /> Level 2</NavLink>
    		<NavLink activeClassName="active" to='/lvl/3' className="locked"><LockOutlined /> Level 3</NavLink>
    	</div>
    	<p className="sidebar__info">New levels unlock on completion of current level.</p>
    	<div className="sidebar__hints">
    		<h4 style={{marginBottom: '0.5rem'}}>Feeling stuck!?</h4>
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
