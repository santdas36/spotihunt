import {useEffect, useState} from 'react';
import {useStateValue} from '../StateProvider';

function Timer() {
	const [{time}, dispatch] = useStateValue();
	const startDate = new Date('Jan 30, 2021 15:00:00').getTime();
	const [syncr, setSyncr] = useState(null);
	useEffect(()=> {
		fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata').then((response) => response.json()).then((response) => setSyncr(response.datetime));
		if (syncr) {
		const syncTime = new Date(syncr).getTime() - new Date().getTime();
		console.log(syncr, syncTime);
		const timerInterval = setInterval(()=> {
			const nowTime = new Date().getTime();
			const difference = ~~(new Date(startDate - nowTime + syncTime).getTime() / 1000);
			dispatch({
				type: 'SET_TIME',
				time: difference,
			});
		}, 1000);
		
		return () => {
			clearInterval(timerInterval);
		}
		}
	}, [syncr]);
	
	return null;
}

export default Timer;