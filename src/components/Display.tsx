import {useRef} from 'react';
import { timeslot } from '../types/timeSlot';
import getCurrentTask from '../utils/get-current-task';
import '../css/Display.css';

import bellSound from '../assets/bell.mp3';

interface DisplayProps {
	timeSlots: timeslot[];
	startTime: number;
	playSounds: boolean;
}

const audio = new Audio(bellSound);

export default function Display({timeSlots,startTime,playSounds}: DisplayProps) {

	const currentTask = getCurrentTask(timeSlots, startTime);

	const lastTask = useRef(currentTask.index);
	if (lastTask.current !== currentTask.index) {
		console.log('task changed from', lastTask.current, 'to', currentTask.index);
		if (currentTask.index > lastTask.current) {
			if (playSounds)
				audio.play();
		}
		lastTask.current = currentTask.index;
	}
 
	return (<>
		<div className="Display">
			<h1>{currentTask.slot.name}</h1>
		</div>
	</>)
}