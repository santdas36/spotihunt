import './Sidebar.css';
import {useEffect, useState} from 'react';
import {NavLink, location} from 'react-router-dom';
import SHLogo from '../assets/logo_sh.png';
import BulbOn from '../assets/bulb_on.png';
import BulbOff from '../assets/bulb_off.png';
import {AccessTimeRounded, LockOutlined} from '@material-ui/icons';
import {auth, db} from '../firebase';
import {useStateValue} from '../StateProvider';


function Sidebar() {
	const [{user}] = useStateValue();
	const [usedHints, setUsedHints] = useState(0);
	
	useEffect(() => {
		if(user) {
			setUsedHints(user?.usedHints);
		}
	}, [user]);
	
	const getHint = async () => {
		fetch(`https://spotihunt-backend.vercel.app/api/get-hint?level=${levelId-1}&quest=${questId-1}&used=1`).then((response) => {
			if(response.status == '200') {
				const userRef = db.collection('users').doc(user.uid);
				db.runTransaction(async (t) => {
					const doc = await t.get(userRef);
					const hintsUsed = doc.data().usedHints;
					if (hintsUsed < 3) {
						t.update(userRef, {
							usedHints: hintsUsed + 1,
						});	
					} else {
						setError('Sorry! You've used the maximum allowed hints.')
					}
				}).then(() => {
					console.log('Transaction success!');
				}).catch((e) => {
					console.log('Transaction failure:', e);
				});
				
				console.log(response.text());
			}
		});
		
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
    			<button onClick={getHint} disabled={usedHints>0}><img src={usedHints<1 ? BulbOn : BulbOff} /></button>
    			<button onClick={getHint} disabled={usedHints>1}><img src={usedHints<2 ? BulbOn : BulbOff} /></button>
    			<button onClick={getHint} disabled={usedHints>2}><img src={usedHints<3 ? BulbOn : BulbOff} /></button>
    		</div>
    	</div>
    </div>
  );
}

export default Sidebar;
