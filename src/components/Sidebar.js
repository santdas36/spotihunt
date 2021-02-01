import './Sidebar.css';
import {useEffect, useState} from 'react';
import {NavLink, useLocation, useHistory} from 'react-router-dom';
import SHLogo from '../assets/logo_sh.png';
import BulbOn from '../assets/bulb_on.png';
import BulbOff from '../assets/bulb_off.png';
import {AccessTimeRounded, LockOutlined, CheckCircleRounded} from '@material-ui/icons';
import {auth, db} from '../firebase';
import firebase from 'firebase';
import {useStateValue} from '../StateProvider';
import {toast} from 'react-toastify';
import {vars} from '../vars';

function Sidebar() {
	const [{user}] = useStateValue();
	const location = useLocation();
	const history = useHistory();
	const [usedHints, setUsedHints] = useState(0);
	const levelsArray = Array.from(Array(vars.levels)).map((e,i)=>i+1);
	const hintsArray = Array.from(Array(vars.maxHints)).map((e,i)=>i+1);
	
	useEffect(() => {
		if(user) {
			setUsedHints(user.usedHints);
		}
	}, [user]);
	
	const isLevelUnlocked = (lvl) => {
		return user.answers[`l${lvl-1}q${vars.quests}`] ? true : false;
	}
	
	const getHint = async () => {
		const currPath = location.pathname.split('/');
		const levelId = currPath[2];
		const questId = currPath[3];
		const hintAvailable = user.hints ? user.hints[`l${levelId}q${questId}`] : false;
		const alreadyAnswered = user.answers ? user.answers[`l${levelId}q${questId}`] : false;
		if(!hintAvailable && !alreadyAnswered) {
		toast.info('Getting your hint...', {autoClose: 1500})	
		fetch(`https://spotihunt-backend.vercel.app/api/get-hint?level=${levelId-1}&quest=${questId-1}&used=${usedHints}`).then((data) => data.text()).then((response) => {
			db.collection('users').doc(auth.currentUser.uid).set({
				usedHints: firebase.firestore.FieldValue.increment(1),
				hints: {
					[`l${levelId}q${questId}`]: response,
				},
			}, {merge: true}).then(()=> {
				setTimeout(()=> toast.info(`Here you go! You have ${vars.maxHints - user.usedHints} hint(s) left.`), 1000);
			});
		});
		}
	}
	
  return (
    <div className="sidebar">
    	<img src={SHLogo} className="sidebar__logo" />
    	<div className="sidebar__levels">
    	
    	{levelsArray.map((lvl)=> {
    		if (lvl == 1) {
    			return (<NavLink activeClassName="active" to='/lvl/1'>{isLevelUnlocked(lvl+1) ? <CheckCircleRounded/> : <AccessTimeRounded />} Level 1</NavLink>);
    		} else {
    			return isLevelUnlocked(lvl) ? 
    			(<NavLink activeClassName="active" to={`/lvl/${lvl}`}>{isLevelUnlocked(lvl+1) ? <CheckCircleRounded/> : <AccessTimeRounded />} Level {lvl}</NavLink>) :
    			(<li className="locked"><LockOutlined /> Level {lvl}</li>)
    		}
    	})};
    	
    	</div>
    	<p className="sidebar__info">New levels unlock on completion of current level.</p>
    	<div className="sidebar__hints">
    		<h4 style={{marginBottom: '0.5rem'}}>Feeling stuck!?</h4>
    		<p>You are given a total of only three hints for the entire contest. Use wisely.</p>
    		<div className="sidebar__hintsImg">
    		
    		{hintsArray.map((h,index)=> (
    			<button onClick={getHint} disabled={usedHints>index}><img src={usedHints>index ? BulbOff : BulbOn} /></button>
    		))}
    		
    		</div>
    	</div>
    </div>
  );
}

export default Sidebar;
