import {useEffect, useState} from 'react';
import {useStateValue} from '../StateProvider';

function Timer() {
	const [{time}, dispatch] = useStateValue();
	const startDate = +new Date('2021-01-31T213:30:00.0+05:30');
	const [syncr, setSyncr] = useState(null);
	
	useEffect(()=> {
		fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata').then((response) => response.json()).then((response) => setSyncr(response.datetime));
	}, []);
	
	useEffect(()=> {
		if (syncr) {
		const syncTime = +new Date(syncr) - +new Date();
		const timerInterval = setInterval(()=> {
			const nowTime = +new Date();
			const difference = ~~(+new Date(startDate - nowTime - syncTime) / 1000);
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