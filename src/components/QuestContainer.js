import './QuestContainer.css';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Quest from './Quest';
import {useState, useEffect} from 'react';
import QuestNav from './QuestNav';
import LevelCompleted from './LevelCompleted';

function QuestContainer() {
	const location = useLocation();
	const [contestCompleted, setContestCompleted] = useState(false);
	
	useEffect(() => {
		const allCompleted = user.answers ? user.answers['l3q5'] : false;
		if (allCompleted) {
			setContestCompleted(true);
		}
	}, [user]);

	return (
		<div className="questContainer">
			{contestCompleted && <LevelCompleted contestComplete={true}/>}
			<QuestNav/>
				<Switch location={location} key={location.pathname}>
					<Route path="/lvl/:levelId/:questId">
            			<Quest />
            		</Route>
            		<Route path="/lvl/:levelId">
            			<Redirect to={`${location.pathname}/1`} />
            		</Route>
            	</Switch>
		</div>
	);
}

export default QuestContainer;