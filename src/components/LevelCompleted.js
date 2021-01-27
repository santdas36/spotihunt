import './LevelCompleted.css';
import {useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';

function LevelCompleted({time, levelId}) {
	const history = useHistory();
	
  return (
    <motion.div
    	className="levelCompleted"
    	initial={{y: '5rem', opacity: 0}}
    	animate={{y: 0, opacity: 1}}
    	exit={{y: '5rem', opacity: 0}}
    >
    	<p>Level 1 Complete!</p>
		<span>You have completed Level {levelId} in {time}.<br/>Please continue to Level {levelId + 1}.</span>
		<button onClick={()=> history.push(`/lvl/${levelId + 1}`)}>Go to Next Level</button>
    </motion.div>
  );
}

export default LevelCompleted;
