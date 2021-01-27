import './LevelCompleted.css';
import {useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';

function LevelCompleted({time, levelId}) {
	const history = useHistory();
	
  return (
    <motion.div
    	className="levelCompleted"
    	initial={{y: 'calc(-50% + 5rem)', x: '-50%', opacity: 0}}
    	animate={{y: '-50%', opacity: 1}}
    	exit={{y: 'calc(-50% + 5rem)', x: '-50%', opacity: 0}}
    	transition={{type: "spring", duration: 0.5}}
    >
    	<h3>Level 1 Complete!</h3>
		<p>You have completed Level {levelId} in {time}.<br/>Please continue to Level {levelId + 1}.</p>
		<button onClick={()=> history.push(`/lvl/${levelId + 1}`)}>Go to Next Level</button>
    </motion.div>
  );
}

export default LevelCompleted;
