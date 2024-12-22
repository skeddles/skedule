import { timeslot } from '../types/timeSlot';
import getMinutesIntoToday from '../utils/get-minutes-into-today';

import '../css/Display.css';

interface DisplayProps {
	timeSlots: timeslot[];
	startTime: number;
}

export default function Display({timeSlots,startTime}: DisplayProps) {

	const minutesIntoToday = getMinutesIntoToday();
	 
	const currentTask:timeslot = timeSlots.find((slot, i) => {
		const previousSlots = timeSlots.slice(0, i);
		const lengthOfAllPreviousSlots = previousSlots.reduce((sum, slot) => sum + slot.length, 0);
		const slotStartTime = startTime + lengthOfAllPreviousSlots;
		const slotEndTime = slotStartTime + slot.length;
		const slotStartedBeforeNow = slotStartTime <= minutesIntoToday;
		const slotEndsAfterNow = slotEndTime >= minutesIntoToday;
		const isCurrentSlot = slotStartedBeforeNow && slotEndsAfterNow;
		console.log('slotStart',{_slot: slot,i,startTime,lengthOfAllPreviousSlots, minutesIntoToday, slotStart: slotStartTime, isCurrentSlot});
		return isCurrentSlot; 
	}) || {name: '', hue: 0, length: 0};
 
	return (
		<div className="Display">
			<h1>{currentTask.name}</h1>
		</div>
	)
}