import './QuestContainer.css';
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Quest from './Quest';

function QuestContainer() {
	const location = useLocation();
	console.log(location);
	return (
		<div className="questContainer">
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route path="/l/:levelId/q/:questId">
            			<Quest />
            		</Route>
            	</Switch>
            </AnimatePresence>
		</div>
	);
}

export default QuestContainer;