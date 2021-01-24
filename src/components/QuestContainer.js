import './QuestContainer.css';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Quest from './Quest';

function QuestContainer() {
	const location = useLocation();
	return (
		<div className="questContainer">
		//	<AnimatePresence>
				<Switch location={location} key={location.pathname}>
					<Route path="/lvl/:levelId/:questId">
            			<Quest />
            		</Route>
            	</Switch>
        //    </AnimatePresence>
		</div>
	);
}

export default QuestContainer;