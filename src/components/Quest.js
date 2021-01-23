import './Quest.css';
import { Switch, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Quest({levelId, questId}) {
	
	const pageAnim = {
		initial: {y: "-1rem"},
		in: {y: 0},
		out: {y: "1rem"},
		};
	
	return (
		<motion.div
			className="quest"
			initial="initial"
			animate="in"
			exit="out"
			variants={{type: "tween",duration: 0.5}}
			transition={pageAnim}
		>
			<div className="quest__box">
				<p className="quest__question">{levelId}{ }{questId} Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore?</p>
				<span className="quest__answer">
					<input type="text" placeholder="Type your answer here..." />
					<button>Submit Answer</button>
				</span>
			</div>
		</motion.div>
	);
}

export default Quest;
