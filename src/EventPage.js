import './EventPage.css';
import Register from './components/Register';
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
import {toast} from 'react-toastify';

function EventPage() {
	const [{user}, dispatch] = useStateValue();
	const [initUser, setInitUser] = useState(false);
	const history = useHistory();
	
	useEffect(()=> {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection('users').doc(user.uid).onSnapshot((data) => {
					dispatch({
						type: "SET_USER",
						user: data.data(),
					});
					setInitUser(true);
				});
				db.collection('usernames').orderBy('score', 'desc').onSnapshot((data) => {
					dispatch({
						type: "SET_LEADERBOARD",
						leaderboard: data.docs,
					});
				});
				db.collection('questions').doc('quest').get().then((data)=> {
					dispatch({
						type: "SET_QUESTIONS",
						questions: data.data(),
					});
				});
			} else {
				setInitUser(true);
				dispatch({
					type: "SET_USER",
					user: null,
				});	
			};
		})
	}, []);
	
  return (
  <AnimatePresence>
    <Route exact path="/">
    	{user ?
	 	   (<Redirect to="/lvl/1/1"/>) :
    		(<Redirect to="/login"/>)
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
    	(<Redirect to="/login"/>)
    	}
    </Route>
    <Route path="/login">
    	{user ?
	 	   (<Redirect to="/lvl/1"/>) :
    		(<Login initUser={initUser} />)
	    }
    </Route>
    <Route path="/register">
    	<Register />
    </Route>
  </AnimatePresence>);  
}

export default EventPage;
