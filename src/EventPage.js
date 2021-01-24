import './EventPage.css';
import Sidebar from './components/Sidebar';
import QuestContainer from './components/QuestContainer';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import {useEffect, useState} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {auth, db} from './firebase';
import {useStateValue} from './StateProvider';
import Login from './components/Login';

function EventPage() {
	const [{user}, dispatch] = useStateValue();
	useEffect(()=> {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection('users').doc(user.uid).get().then((data)=> {
					dispatch({
						type: "SET_USER",
						user: data.data(),
					});
				}
			}
		});	
	}, []);
	
  return (
  {user ?
    (<div className="event">
    	<Sidebar/>
    	<QuestContainer/>
    	<Leaderboard/>
    	<Footer/>
    </div>) :
    (<Login/>)
    }
  );
}

export default EventPage;
