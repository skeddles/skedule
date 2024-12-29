import { timeslot } from '../types/timeSlot';
import getMinutesIntoToday from '../utils/get-minutes-into-today';

interface currentTask {
	index: number;
	slot: timeslot;
}

export default function getCurrentTask(timeSlots: timeslot[], startTime: number): currentTask {
	const minutesIntoToday = getMinutesIntoToday();

	for (let i = 0; i < timeSlots.length; i++) {
		const slot = timeSlots[i];
		const previousSlots = timeSlots.slice(0, i);
		const lengthOfAllPreviousSlots = previousSlots.reduce((sum, slot) => sum + slot.length, 0);
		const slotStartTime = startTime + lengthOfAllPreviousSlots;
		const slotEndTime = slotStartTime + slot.length;
		const slotStartedBeforeNow = slotStartTime <= minutesIntoToday;
		const slotEndsAfterNow = slotEndTime >= minutesIntoToday;
		const isCurrentSlot = slotStartedBeforeNow && slotEndsAfterNow;

		//if (isCurrentSlot) console.log('current slot:', {slot, previousSlots, lengthOfAllPreviousSlots, slotStartTime, slotEndTime, minutesIntoToday, slotStartedBeforeNow, slotEndsAfterNow, isCurrentSlot});

		if (isCurrentSlot) return {index:i, slot:slot};
	}

	return {index:-1, slot:{name: '', hue: 0, length: 0}};
}