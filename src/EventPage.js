import './EventPage.css';
import Sidebar from './components/Sidebar';
import QuestContainer from './components/QuestContainer';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import {useEffect, useState} from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import {AnimatePresence,motion} from 'framer-motion';
import {auth, db} from './firebase';
import {useStateValue} from './StateProvider';
import Login from './components/Login';

function EventPage() {
	const [{user}, dispatch] = useStateValue();
	const [initUser, setInitUser] = useState(false);
	const history = useHistory();
	
	useEffect(()=> {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection('users').doc(user.uid).get().then((data)=> {
					dispatch({
						type: "SET_USER",
						user: data.data(),
					});
				});
			} else {setInitUser(true)};
		}).then(()=>setInitUser(true));	
	}, []);
	
  return (
  <AnimatePresence>
    <Route exact path="/">
    	{user ?
	 	   (<Redirect to="/lvl/1/1"/>) :
    		(<Login initUser={initUser} />)
	    }
    </Route>
    <Route path="/lvl">
    	{user ?
    	(<motion.div className="event" initial={{opacity: 0}} animate={{opacity: 1}}>
    		<Sidebar/>
    		<QuestContainer/>
    		<Leaderboard/>
	    	<Footer/>
    	</motion.div>) :
    	(<Login initUser={initUser} />)
    	}
    </Route>
  </AnimatePresence>);  
}

export default EventPage;
