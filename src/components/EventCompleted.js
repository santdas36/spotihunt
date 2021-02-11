import './EventCompleted.css';
import {motion} from 'framer-motion';
import {useEffect} from 'react';

function EventCompleted() {
	
	useEffect(()=> {
		document.title="Contest is over! - Spot-i-Hunt Team from Christ.Keng";
	}, []);
	
  return (
    <motion.div
    	className="eventCompleted"
    	initial={{scale: 0.8, opacity: 0}}
    	animate={{scale: 1, opacity: 1}}
    	exit={{scale: 0.8, opacity: 0}}
    	transition={{type: "tween", duration: 1}}
    >Contest is over!
    </motion.div>
  );
}

export default EventCompleted;
