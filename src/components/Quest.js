import './Quest.css';
import {useState, useEffect} from 'react';
import {Switch, Route, useLocation, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {useStateValue} from "../StateProvider";
import HintIcon from '../assets/hint.svg';
import {db, auth} from '../firebase';
import CompletedIcon from '../assets/completed.png';
import QuestLockedIcon from '../assets/locked.png';
import {toast} from 'react-toastify';

function Quest() {
	const {levelId, questId} = useParams();
	const [{user, questions}] = useStateValue();
	const [answer, setAnswer] = useState('');
	const [hint, setHint] = useState(false);
	const [questCompleted, setQuestCompleted] = useState(false);
	const [questIsUnlocked, setQuestIsUnlocked] = useState(false);
	const [userAnswers, setUserAnswers] = useState(null);
	const [levelComplete, setLevelComplete] = useState(false);
	const [loading, setLoading] = useState(false);
	
	useEffect(() => {
		
		const prevQuestCompleted = () => {
			const lvl = parseInt(levelId);
			const qst = parseInt(questId);
			if (lvl === 1 && qst === 1) {
				return true;
			} else if (lvl >= 1 && qst > 1) {
				console.log(user.answers[`l${levelId}q${questId - 1}`]);
				if (user.answers[`l${levelId}q${questId - 1}`]) {
					return true;
				}
			} else if (lvl > 1 && qst === 1) {
				if (user.answers[`l${levelId - 1}q5`]) {
					return true;
				}
			} else {
				return false;
			}
		}
		
		if (prevQuestCompleted()) {
			setQuestIsUnlocked(true);
		}
		
		const questCompleted = user.answers ? user.answers[`l${levelId}q${questId}`] : false;
		if (questCompleted) {
			setUserAnswers(questCompleted);
			setQuestCompleted(true);
		}
		
		const hintAvailable = user.hints ? user.hints[`l${levelId}q${questId}`] : false;
		if (hintAvailable) {
			setHint(hintAvailable);
		}	
	}, [user]);
		

	const validate = async (e) => {
		e.preventDefault();
		setLoading(true);
		const accuracy = await fetch(`https://spotihunt-backend.vercel.app/api/validate-answer?answer=${encodeURI(answer.replace(/[^a-zA-Z0-9 ]/g, ""))}&level=${levelId-1}&quest=${questId-1}`).then((data) => data.text());
		console.log(accuracy);
		if (accuracy > 0.8) {
			db.collection('users').doc(auth.currentUser.uid).set({
				answers: {
					[`l${levelId}q${questId}`]: [answer, accuracy]
				}
			}, {merge: true}).then(()=> {
				toast.success("That's right! Proceed to next quest...");
				setLoading(false);
				if(parseInt(levelId) < 3 && parseInt(questId) === 5) {
					setLevelComplete(true);
				}
			}).catch((e) => {
				toast.error(e.message);
				setLoading(false);
			});
		} else {
			toast.warning(`Sorry, that's not the answer we were looking for. But you were close (${(parseFloat(accuracy)*100).toFixed(2)}%). Try again!`);
			setLoading(false);
		}
	}
	
	
	return (
		<motion.div
			className="quest"
			initial={{y: "-5rem", opacity: 0}}
			animate={{y: 0, opacity: 1}}
			exit={{y: "5rem", opacity: 0}}
		>
		{questIsUnlocked ?
			(<form className="quest__box" onSubmit={(e) => validate(e)}>
				<p className="quest__question">{levelId}/{questId}{ }{questions && questions[`l${levelId}`][`q${questId}`]}</p>
				{(hint && !questCompleted) && (<motion.p initial={{scale: 0.75, opacity: 0}} animate={{scale: 1, opacity: 1}} variants={{type: "tween", duration: 0.3}} className="quest__hint"><img src={HintIcon} /><span>{hint}</span></motion.p>)}
				{(questCompleted && userAnswers) && (<motion.p initial={{scale: 0.75, opacity: 0}} animate={{scale: 1, opacity: 1}} variants={{type: "tween", duration: 0.3}} className="quest__hint accuracy"><b>Accuracy: </b>{(parseFloat(userAnswers[1])*100).toFixed(2)}%</motion.p>)}
				<span className="quest__answer">
					<input type="text" placeholder="Type your answer here..." disabled={questCompleted} value={userAnswers ? userAnswers[0] : answer} onChange={(e) => setAnswer(e.target.value)} />
					{!questCompleted && <motion.button animate={{scale: 1, opacity: 1}} exit={{scale: 0.5, opacity: 0}} disabled={loading}>{loading ? 'Processing...' : 'Submit Answer'}</motion.button>}
				</span>
				{questCompleted && <motion.img src={CompletedIcon} initial={{scale: 2}} animate={{scale: 1}} variants={{type: "spring", duration: 1}} className="completed" />}
			</form>) :
			(<motion.div animate={{opacity: 1}} exit={{opacity: 0}} className="quest__locked">
				<img src={QuestLockedIcon} />
			</motion.div>)
		}
		</motion.div>
	);
}

export default Quest;
