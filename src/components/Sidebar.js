import './Sidebar.css';
import {useEffect, useState} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import SHLogo from '../assets/logo_sh.png';
import BulbOn from '../assets/bulb_on.png';
import BulbOff from '../assets/bulb_off.png';
import {AccessTimeRounded, LockOutlined} from '@material-ui/icons';
import {auth, db} from '../firebase';
import firebase from 'firebase';
import {useStateValue} from '../StateProvider';


function Sidebar() {
	const [{user}] = useStateValue();
	const location = useLocation();
	const [usedHints, setUsedHints] = useState(0);
	
	useEffect(() => {
		if(user) {
			setUsedHints(user?.usedHints);
		}
		console.log(user);
	}, [user]);
	
	const getHint = async () => {
		const currPath = location.pathname.split('/');
		const levelId = currPath[2];
		const questId = currPath[3];
		const hintAvailable = user.hints ? user.hints[`l${levelId}q${questId}`] : false;
		if(!hintAvailable) {
		fetch(`https://spotihunt-backend.vercel.app/api/get-hint?level=${levelId-1}&quest=${questId-1}&used=${usedHints}`).then((data) => data.text()).then((response) => {
			db.collection('users').doc(auth.currentUser.uid).set({
				usedHints: firebase.firestore.FieldValue.increment(1),
				hints: {
					[`l${levelId}q${questId}`]: response,
				},
			}, {merge: true});
		});
		}
	}
	
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
    			<button onClick={getHint} disabled={usedHints>0}><img src={usedHints>0 ? BulbOff : BulbOn} /></button>
    			<button onClick={getHint} disabled={usedHints>1}><img src={usedHints>1 ? BulbOff : BulbOn} /></button>
    			<button onClick={getHint} disabled={usedHints>2}><img src={usedHints>2 ? BulbOff : BulbOn} /></button>
    		</div>
    	</div>
    </div>
  );
}

export default Sidebar;
