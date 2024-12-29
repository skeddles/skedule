import { useState } from 'react'

import Display from './Display'
import Settings from './Settings'

import '../css/reset.css'
import '../css/App.css'
import '../css/colors.css'

import SettingsIcon from '../assets/gear.svg?react'

function App() {

	const [timeslots, setTimeslots] = useState(JSON.parse(localStorage.getItem("timeSlots") || "[]") ?? []);
	const [startTime, setStartTime] = useState(parseInt(localStorage.getItem("startTime") || "480") ?? 480);
	const [settingsPanelIsOpen, setSettingsPanelIsOpen] = useState(timeslots.length==0);
	const [showClock, setShowClock] = useState(JSON.parse(localStorage.getItem("showClock") || "true") ?? true);
	const [playSounds, setPlaySounds] = useState(JSON.parse(localStorage.getItem("playSounds") || "true") ?? true);

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

	return (
		<div className="app">
			<Settings 
				isOpen={settingsPanelIsOpen} 
				timeSlots={timeslots} 
				setTimeslots={updateTimeSlots} 
				startTime={startTime} 
				setStartTime={updateStartTime} 
				showClock={showClock} 
				setShowClock={updateShowClock} 
				playSounds={playSounds} 
				setPlaySounds={updatePlaySounds}
				/>

			<Display 
				timeSlots={timeslots} 
				startTime={startTime} 
				playSounds={playSounds} 
				setSettingsPanelIsOpen={setSettingsPanelIsOpen} 
				showClock={showClock}
				/>

			<button 
				className="settingsButton" 
				onClick={() => setSettingsPanelIsOpen(!settingsPanelIsOpen)}>
					<SettingsIcon />
			</button>
		</div>
	)
}

export default App
