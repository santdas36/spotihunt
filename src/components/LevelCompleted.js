import './LevelCompleted.css';
import {useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';

function LevelCompleted({time, levelId, contestComplete}) {
	const history = useHistory();
	
  return (
    <motion.div
    	className="levelCompleted"
    	initial={{y: 'calc(-50% + 3rem)', x: '-50%', z: 8, opacity: 0}}
    	animate={{y: '-50%', opacity: 1}}
    	exit={{y: 'calc(-50% + 3rem)', opacity: 0}}
    	transition={{type: "spring", duration: 0.5}}
    >
    	{contestComplete ? (<>
    		<h3 style={{marginTop: '2rem'}}>Congratulations!</h3>
    		<p className="contestComplete">You've successfully completed all the quests.<br/>Stay tuned for the results.</p>
    		<h4>Good luck!</h4>
    	</>) :
    	(<>
    		<h3>Level {levelId} Complete!</h3>
			<p>You have completed Level {levelId} in {time} minutes.<br/>Please continue to Level {parseInt(levelId) + 1}.</p>
			<button onClick={()=> history.push(`/lvl/${parseInt(levelId) + 1}`)}>Go to Next Level</button>
		</>)
		}
    </motion.div>
  );
}

export default LevelCompleted;
