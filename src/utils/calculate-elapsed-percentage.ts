import calculateTotalMinutes from './calculate-total-minutes';
import getMinutesIntoToday from './get-minutes-into-today';
import { timeslot } from '../types/timeSlot';


export default function calculateElapsedPercentage(startTime: number, timeSlots: timeslot[]): number {
	const totalMinutes = calculateTotalMinutes(timeSlots);
	const minutesIntoToday = getMinutesIntoToday();
	const secondsIntoToday = 60 * minutesIntoToday + new Date().getSeconds();
	const startTimeInSeconds = startTime * 60;
	const totalSeconds = totalMinutes * 60;
	return (secondsIntoToday - startTimeInSeconds) / totalSeconds;
}
