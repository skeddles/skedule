import { useState } from 'react';

import { timeslot } from '../types/timeSlot';
import minutesToTime from '../utils/minutes-to-time';

import SlotEditor from './SlotEditor'
import TimeSelector from './TimeSelector';
import Checkbox from './Checkbox';
import Info from './Info';
import ThemeSelector from './ThemeSelector';

import '../css/Settings.css'
import PlusIcon from '../assets/plus.svg?react'
import HelpIcon from '../assets/help.svg?react'



interface timeLineEditorProps {
	isOpen: boolean;
	timeSlots: timeslot[];
	setTimeslots: Function;
	startTime: number;
	setStartTime: Function;
	showClock: boolean;
	setShowClock: Function;
	playSounds: boolean;
	setPlaySounds: Function;
	theme: string;
	setTheme: Function;
}

export default function TimelineEditor({isOpen, timeSlots, setTimeslots, startTime, setStartTime, showClock, setShowClock, playSounds, setPlaySounds, theme, setTheme}: timeLineEditorProps) {

	const [helpPopupIsOpen, setHelpPopupIsOpen] = useState(false);

	const totalMinutes = timeSlots.reduce((acc, ts) => acc + ts.length, 0);
	const totalTime = Math.floor(totalMinutes/60) + ':' + (totalMinutes%60).toString().padStart(2, '0');

	const endTime = minutesToTime(startTime + totalMinutes);

	function addSlot() {
		setTimeslots([...timeSlots, {name: 'slot'+timeSlots.length, length: 30, hue: Math.random()*360}]);
	}

	function toggleHelp() {
		setHelpPopupIsOpen(!helpPopupIsOpen);
	}

	
	return (<div className={"Settings"+ (isOpen?' open':'')}>

			<div className="container">
		

				<h1>skedule
					<button onClick={toggleHelp}><HelpIcon/></button>
				</h1>

				<Info isOpen={helpPopupIsOpen}/>

				<h2>Start Time</h2>
				<TimeSelector startTime={startTime} setStartTime={setStartTime}/>
				<div className="info">End Time: {endTime}</div>

				<h2>Time Blocks</h2>
				{timeSlots.map((ts,i) => (<SlotEditor index={i} key={i} slot={ts} setTimeslots={setTimeslots} timeSlots={timeSlots}/>))}
				<div className="info">Total Time: {totalTime}</div>

				<button onClick={addSlot}><PlusIcon/> Add Block</button>

				<h2>Display</h2>
				<Checkbox label="Show Clock" checked={showClock} onChange={setShowClock}/>
				<Checkbox label="Play Sounds" checked={playSounds} onChange={setPlaySounds}/>

				<h2>Theme</h2>
				<ThemeSelector theme={theme} setTheme={setTheme}/>

			</div>
	</div>)
}