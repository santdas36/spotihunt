import './EventCompleted.css';
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';
import {db, timestamp} from '../firebase';
import {useStateValue} from '../StateProvider';
import {toast} from 'react-toastify';

function EventCompleted() {
	
	useEffect(()=> {
		document.title="Contest is over!";
	}, []);
	
	const animate = {y: 0, opacity: 1};
	const initialAnim = {y: '1rem', opacity: 0};
	const [{user}] = useStateValue();
	const [feedback, setFeedback] = useState('');
	const [loading, setLoading] = useState(false);
	const [fbSent, setFbSent] = useState(false);
	
	const sendFeedback = (e) => {
		e.preventDefault();
		if(feedback) {
			setLoading(true);
			db.collection('feedbacks').add({
				feedback: feedback,
				team: user?.teamname || 'anonymous',
				timestamp: timestamp,
			}).then(()=> {
				setTimeout(()=> {
				setLoading(false);
				setFbSent(true);
				setFeedback('');
				toast.success('Feedback sent!');
				}, 1000);
			}).catch((error) => {
				toast.error(error.message || 'Some error occurred!');
			});
		}
	}
	
  return (
    <motion.div
    	className="eventCompleted"
    	initial={{opacity: 0}}
    	animate={{opacity: 1}}
    	transition={{type: "tween", duration: 0.75, delay: 0.5}}
    >
		<motion.h1 initial={initialAnim} animate={animate} transition={{type: 'tween', delay: 1.5}}>Thanks for <br/>Your Participation!</motion.h1>
		<motion.h2 initial={initialAnim} animate={animate} transition={{type: 'tween', delay: 1.6}}>Stay Tuned for Results.</motion.h2>
		
		<motion.form initial={initialAnim} animate={animate} transition={{type: 'tween', delay: 1.7}} onSubmit={sendFeedback}>
			{fbSent ? <motion.h3 initial={initialAnim} animate={animate} className="feedbackSent">Thanks for your feedback.</motion.h3> :
			<><label>Got anything to say to us?</label>
			<textarea required value={feedback} onChange={(e)=>setFeedback(e.target.value)} rows="3" placeholder="Write about your experience, and how it can be improved in the upcoming events..."></textarea>
			<button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Feedback'}</button></>}
		</motion.form>

		
		<motion.p initial={{y: '-1rem', opacity: 0}} transition={{type: 'tween', delay: 1.7}} animate={animate} ><span>Hope you had fun! - </span><a href="https://instagram.com/christ.keng">@christ.keng</a></motion.p>
    </motion.div>
  );
}

export default EventCompleted;
