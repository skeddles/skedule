import { useEffect, useRef, useState } from 'react';
import { timeslot } from '../types/timeSlot';
import calculateElapsedPercentage from '../utils/calculate-elapsed-percentage';
import calculateTotalMinutes from '../utils/calculate-total-minutes';
import getMinutesIntoToday from '../utils/get-minutes-into-today';

import Timeline from './Timeline'
import Clock from './Clock'
import CurrentTask from './CurrentTask'

import '../css/Display.css';

interface DisplayProps {
	timeSlots: timeslot[];
	startTime: number;
	playSounds: boolean;
	setSettingsPanelIsOpen: Function;
	showClock: boolean;
}

export default function Display({timeSlots,startTime,playSounds,setSettingsPanelIsOpen,showClock}: DisplayProps) {

	const [currentStatus, setCurrentStatus] = useState('before');
    const [elapsedPercentage, setElapsedPercentage] = useState(calculateElapsedPercentage(startTime, timeSlots));
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
	useEffect(() => {
		setElapsedPercentage(calculateElapsedPercentage(startTime, timeSlots));
	}, [timeSlots, startTime]);

	clearInterval(timer.current);
	timer.current = setInterval(() => {
		setElapsedPercentage(calculateElapsedPercentage(startTime, timeSlots));
	}, 1000);

	function checkForStatusUpdate () {
		const minutesIntoToday = getMinutesIntoToday();
		const totalMinutes = calculateTotalMinutes(timeSlots);

		let newStatus;
		if (timeSlots.length === 0)
			newStatus = 'setup';
		else if (minutesIntoToday < startTime)
			newStatus = 'before';
		else if (minutesIntoToday < startTime + totalMinutes)
			newStatus = 'running';
		else 
			newStatus = 'after';

		if (newStatus !== currentStatus) 
			setCurrentStatus(newStatus);
	}

	const statusTimer:any = useRef(null);

	clearInterval(statusTimer.current);
	statusTimer.current = setInterval(checkForStatusUpdate,500); 
	
	checkForStatusUpdate();

	return (<div className="Display" onClick={()=>setSettingsPanelIsOpen(false)}>
		{showClock && <Clock />}
		<CurrentTask timeSlots={timeSlots} startTime={startTime} playSounds={playSounds} />
		{currentStatus=='running' && <Timeline timeSlots={timeSlots} elapsedPercentage={elapsedPercentage}/>}
		{currentStatus=='before' && <div className="not-running">Work will begin soon.</div>}
		{currentStatus=='after' && <div className="not-running">Rest easy, work is over.</div>}
		{currentStatus=='setup' && <div className="not-running">Add a time block to begin.</div>}
		<div className="spacer"></div>
	</div>)
}