import { useState, useRef } from 'react'
import calculateTotalMinutes from '../utils/calculate-total-minutes';
import getMinutesIntoToday from '../utils/get-minutes-into-today';

import Display from './Display'
import Timeline from './Timeline'
import Settings from './Settings'
import Clock from './Clock'

import '../css/reset.css'
import '../css/App.css'
import '../css/colors.css'

import SettingsIcon from '../assets/gear.svg?react'


function App() {

	const [timeslots, setTimeslots] = useState(JSON.parse(localStorage.getItem("timeSlots") || "[]") ?? []);
	const [startTime, setStartTime] = useState(parseInt(localStorage.getItem("startTime") || "480") ?? 480);
	const [settingsPanelIsOpen, setSettingsPanelIsOpen] = useState(timeslots.length==0);
	const [currentStatus, setCurrentStatus] = useState('before');
	const [showClock, setShowClock] = useState(JSON.parse(localStorage.getItem("showClock") || "true") ?? true);
	const [playSounds, setPlaySounds] = useState(JSON.parse(localStorage.getItem("playSounds") || "true") ?? true);
	const statusTimer:any = useRef(null);

	console.log(timeslots);

	clearInterval(statusTimer.current);
	statusTimer.current = setInterval(checkForStatusUpdate,500); 
	
	function checkForStatusUpdate () {
		const minutesIntoToday = getMinutesIntoToday();
		const totalMinutes = calculateTotalMinutes(timeslots);

		let newStatus;
		if (timeslots.length === 0)
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

	function updateStartTime (newStartTime: number) {
		setStartTime(newStartTime);
		localStorage.setItem("startTime", newStartTime.toString());
	}

	function updateTimeSlots (newTimeSlots: any) {
		setTimeslots(newTimeSlots);
		localStorage.setItem("timeSlots", JSON.stringify(newTimeSlots));
	}

	function updateShowClock (newShowClock: boolean) {
		setShowClock(newShowClock);
		localStorage.setItem("showClock", newShowClock.toString());
	}

	function updatePlaySounds (newPlaySounds: boolean) {
		setPlaySounds(newPlaySounds);
		localStorage.setItem("playSounds", newPlaySounds.toString());
	}

	checkForStatusUpdate();

	return (
		<div className="app">
			<Settings isOpen={settingsPanelIsOpen} timeSlots={timeslots} setTimeslots={updateTimeSlots} startTime={startTime} setStartTime={updateStartTime} showClock={showClock} setShowClock={updateShowClock} playSounds={playSounds} setPlaySounds={updatePlaySounds}/>

			<button className="settingsButton" onClick={() => setSettingsPanelIsOpen(!settingsPanelIsOpen)}><SettingsIcon /></button>

			<div className="main" onClick={()=>setSettingsPanelIsOpen(false)}>
				{showClock && <Clock />}
				<Display timeSlots={timeslots} startTime={startTime} playSounds={playSounds} />
				{currentStatus=='running' && <Timeline timeSlots={timeslots} startTime={startTime}/>}
				{currentStatus=='before' && <div className="not-running">Work will begin soon.</div>}
				{currentStatus=='after' && <div className="not-running">Rest easy, work is over.</div>}
				{currentStatus=='setup' && <div className="not-running">Add a time block to begin.</div>}
				<div className="spacer"></div>
			</div>
			
		</div>
	)
}

export default App
