import {useEffect} from 'react';
import {useStateValue} from '../StateProvider';

function Timer() {
	const [dispatch] = useStateValue();
	const startDate = new Date('Jan 30, 2021 14:00:00').getTime();
	
	useEffect(()=> {
		setInterval(()=> {
			const nowTime = new Date().getTime();
			const difference = ~~(new Date(startDate - nowTime).getTime() / 1000);
			console.log(difference);
			dispatch({
				type: SET_TIME,
				time: difference,
			});
		}, 1000);
	}, []);
	
	return null;
}

export default Timer;