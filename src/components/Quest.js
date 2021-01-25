import './Quest.css';
import {useState} from 'react';
import {Switch, Route, useLocation, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {useStateValue} from "../StateProvider";

function Quest() {
	const {levelId, questId} = useParams();
	const [{questions}] = useStateValue();
	const [answer, setAnswer] = useState('');
	
	const validate = async (e) => {
		e.preventDefault();
		const response = await fetch(`https://spotihunt-backend.vercel.app/api/validate-answer?answer=${encodeURI(answer.replace(/[^a-zA-Z0-9 ]/g, ""))}&level=${levelId}&quest=${questId}`).then((data) => data.text());
		console.log(response);
		if (response > 0.8) {
			alert(response);
		}
	}
	
	return (
		<motion.div
			className="quest"
			initial={{y: "100%", opacity: 0}}
			animate={{y: 0, opacity: 1}}
			exit={{y: "-100%", opacity: 0}}
			variants={{type: "tween", duration: 1}}
		>
			<form className="quest__box" onSubmit={(e) => validate(e)}>
				<p className="quest__question">{levelId}/{questId}{ }{questions && questions[`l${levelId}`][`q${questId}`]}</p>
				<span className="quest__answer">
					<input type="text" placeholder="Type your answer here..." value={answer} onChange={(e) => setAnswer(e.target.value)} />
					<button>Submit Answer</button>
				</span>
			</form>
		</motion.div>
	);
}

export default Quest;
