import {useState, useEffect } from 'react';

import '../css/Clock.css';

export default function Clock() {

	const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

	useEffect(() => {
		console.log('started time interval');
		let timer = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString());
		});

		return function cleanup() {
			console.log('cleaned up time interval');
			clearInterval(timer);
		}
	}, []);

	return (<div className="Clock">
		<div>{currentTime}</div>
	</div>)
}