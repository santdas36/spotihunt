import {useEffect} from 'react';
import {useStateValue} from '../StateProvider';

function Timer() {
	const [{time}, dispatch] = useStateValue();
	const startDate = new Date('Jan 30, 2021 14:00:00').getTime();
	
	useEffect(()=> {
		const syncTime = async() => {
			return fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata').then((response) => response.json()).then((response) => new Date(response.datetime).getTime() - new Date().getTime());
		}
		console.log('sync', syncTime());
		const timerInterval = setInterval(()=> {
			const nowTime = new Date().getTime();
			const difference = ~~(new Date(startDate - nowTime).getTime() / 1000);
			dispatch({
				type: 'SET_TIME',
				time: difference,
			});
		}, 1000);
		
		return () => {
			clearInterval(timerInterval);
		}
	}, []);
	
	return null;
}

export default Timer;