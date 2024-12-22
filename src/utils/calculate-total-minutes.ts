import { timeslot } from '../types/timeSlot';

export default function calculateTotalMinutes (timeSlots: timeslot[]): number {
  	return timeSlots.reduce((sum, timeSlot) => {
		return sum + timeSlot.length;
	}, 0);
}