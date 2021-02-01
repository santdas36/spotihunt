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
import {vars} from './vars';

function EventPage() {
	const [{user, time}, dispatch] = useStateValue();
	const [initUser, setInitUser] = useState(false);
	const [contestStarted, setContestStarted] = useState(false);
	const [resultsPublished, setResultsPublished] = useState(false);
	const [timeup, setTimeup] = useState(false);
	const history = useHistory();
	
	useEffect(() => {
		if (time<0) {
			setContestStarted(true);
		}
		if (-time>vars.duration) {
			setTimeup(true);
		}
	}, [time])
	
	useEffect(()=> {
		if(timeup) {document.title = 'Time Up!'}
    	if(user && !contestStarted) {document.title = 'Waiting for contest to begin...'}
	}, [timeup, user, contestStarted]);
	
	useEffect(()=> {
		document.title = 'Loading...';
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection('users').doc(user.uid).onSnapshot((data) => {
					dispatch({
						type: "SET_USER",
						user: data.data(),
					});
					setInitUser(true);
				});
				db.collection('usernames').orderBy('actualScore', 'desc').onSnapshot((data) => {
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
				document.title = 'Log into your Spot-i-Hunt profile to continue...';
			};
		})
	}, []);
	
  return (
  <AnimatePresence>
    {(timeup && !resultsPublished) && <Redirect to="/timeup"/>}
    <Route exact path="/">
    	{(user && contestStarted) ?
	 	   (<Redirect to="/lvl/1/1"/>) :
    		(<Redirect to="/login"/>)
	    }
    </Route>
    <Route path="/lvl">
    	{(user && contestStarted) ?
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
    	{(user && contestStarted) ?
	 	   (<Redirect to="/lvl/1"/>) :
    		(<Login initUser={initUser} contestStarted={contestStarted} />)
	    }
    </Route>
    <Route path="/register">
    	<Register />
    </Route>
    <Route path="/timeup">
    	<h1>Event completed.</h1>
    </Route>
  </AnimatePresence>);  
}

export default EventPage;
