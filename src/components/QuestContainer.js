import './QuestContainer.css';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Quest from './Quest';
import {useState, useEffect} from 'react';
import QuestNav from './QuestNav';
import LevelCompleted from './LevelCompleted';
import {useStateValue} from '../StateProvider';
import {vars} from '../vars';

function QuestContainer() {
	const location = useLocation();
	const [{user}] = useStateValue();
	const [contestCompleted, setContestCompleted] = useState(false);
	
	useEffect(() => {
		const allCompleted = user.answers ? user.answers[`l${vars.levels}q${vars.quests}`] : false;
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