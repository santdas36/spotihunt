import './Quest.css';
import { Switch, Route, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateValue } from "../StateProvider";

function Quest() {
	const {levelId, questId} = useParams();
	const [{questions}] = useStateValue();
	console.log(questions);
	
	return (
		<motion.div
			className="quest"
			initial={{y: "100%", opacity: 0}}
			animate={{y: 0, opacity: 1}}
			exit={{y: "-100%", opacity: 0}}
			variants={{type: "tween", duration: 1}}
		>
			<div className="quest__box">
				<p className="quest__question">{levelId}/{questId}{ }{questions && questions[`l${levelId}`][`q${questId}`]}</p>
				<span className="quest__answer">
					<input type="text" placeholder="Type your answer here..." />
					<button>Submit Answer</button>
				</span>
			</div>
		</motion.div>
	);
}

export default Quest;
