import './Quest.css';
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Quest() {
	const {levelId, questId} = useParams();
	
	return (
		<motion.div
			className="quest"
			initial={{y: "100%", opacity: 0}}
			animate={{y: 0, opacity: 1}}
			exit={{y: "-100%", opacity: 0}}
			variants={{type: "tween", duration: 1}}
		>
			<div className="quest__box">
				<p className="quest__question">{levelId}/{questId} Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore?</p>
				<span className="quest__answer">
					<input type="text" placeholder="Type your answer here..." />
					<button>Submit Answer</button>
				</span>
			</div>
		</motion.div>
	);
}

export default Quest;
