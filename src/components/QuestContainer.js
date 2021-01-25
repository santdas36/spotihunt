import './QuestContainer.css';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Quest from './Quest';
import QuestNav from './QuestNav';

function QuestContainer() {
	const location = useLocation();
	return (
		<div className="questContainer">
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