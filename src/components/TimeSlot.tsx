
import { timeslot } from '../types/timeSlot';
import calculateTotalMinutes from '../utils/calculate-total-minutes';
import hueToHsl from '../utils/hue-to-hsl';
import '../css/TimeSlot.css';

interface TimeSlotProps {
	timeSlot: timeslot;
	timeSlots: timeslot[];
}


export default function TimeSlot ({timeSlot, timeSlots}: TimeSlotProps) {
	const totalTime = calculateTotalMinutes(timeSlots);
	const percentOfTotal = (timeSlot.length / totalTime) * 100;

	const style = {
		backgroundColor: hueToHsl(timeSlot.hue),
		width: percentOfTotal + '%'
	}

	return (
		<div className="TimeSlot" id={"timeslot-"+timeSlot.name} style={style}></div>
	)
}