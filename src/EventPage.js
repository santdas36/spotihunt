import './EventPage.css';
import Sidebar from './components/Sidebar';
import QuestContainer from './components/QuestContainer';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import {useEffect, useState} from 'react';
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {auth, db} from './firebase';
import {useStateValue} from './StateProvider';
import Login from './components/Login';

function EventPage() {
	const [{user}, dispatch] = useStateValue();
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
			}
		});	
	}, []);
	
  return (
  <AnimatePresence exitBeforeEnter>
    <Route exact path="/">
    	{user ?
	 	   <Redirect to="/lvl/1/1"/> :
    		<motion.Login  initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} />
	    }
    </Route>
    <Route path="/lvl">
    	<motion.div className="event" initial={{opacity: 0}} animate={{opacity: 1}}>
    		<Sidebar/>
    		<QuestContainer/>
    		<Leaderboard/>
	    	<Footer/>
    	</motion.div>
    </Route>
  </AnimatePresence>);  
}

export default EventPage;
