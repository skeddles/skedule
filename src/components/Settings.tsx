import { useState } from 'react';

import { timeslot } from '../types/timeSlot';
import minutesToTime from '../utils/minutes-to-time';

import SlotEditor from './SlotEditor'
import TimeSelector from './TimeSelector';
import Checkbox from './Checkbox';

import '../css/Settings.css'
import PlusIcon from '../assets/plus.svg?react'
import HelpIcon from '../assets/help.svg?react'
import BlueskyIcon from '../assets/bluesky.svg?react'
import YoutubeIcon from '../assets/youtube.svg?react'
import ItchIoIcon from '../assets/itchio.svg?react'

interface timeLineEditorProps {
	isOpen: boolean;
	timeSlots: timeslot[];
	setTimeslots: Function;
	startTime: number;
	setStartTime: Function;
	showClock: boolean;
	setShowClock: Function;
}

export default function TimelineEditor({isOpen, timeSlots, setTimeslots, startTime, setStartTime, showClock, setShowClock}: timeLineEditorProps) {

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

				<div className="helpPopup" style={{height: helpPopupIsOpen?'auto':0}}>
					<p>
						<strong>skedule</strong> is a free tool that helps you plan out a daily schedule,
						then displays the task you should be currently working on. This tool is ideal for 
						helping you stay on your current task, but avoiding hyperfixation distrating you 
						from others. skedule picks your current task based on the current time, and therefore cannot be paused - similar to a work day. 
					</p>
					<p>
						Add time blocks for each block of time you want to dedicate to a single thing. You can either keep it generic such as "Work" or "Clean", or you can update these with specific tasks at the beginning of each day. I reccomend including breaks in your schedule, as well as time for meals and other activities, as the clock waits for no one. 
					</p>

					<p className="social">
						Created by <strong>skeddles</strong> 
						<a href="https://bsky.app/profile/skeddles.com" target="_blank"><BlueskyIcon/></a>
						<a href="https://www.youtube.com/@skeddless" target="_blank"><YoutubeIcon/></a>
						<a href="https://skeddles.itch.io/" target="_blank"><ItchIoIcon/></a>
					</p>
				
					<div className="tipping">
						<p>Like this tool?</p>
						<a href='https://ko-fi.com/skeddles' target='_blank'><img height='36' style={{border: '0px', height: '36px'}} src='https://storage.ko-fi.com/cdn/kofi1.png?v=6'  alt='Buy Me a Coffee at ko-fi.com' /></a>
						<p>Tip via Ko-Fi</p>
					</div>
				
				</div>

				<h2>Start Time</h2>
				<TimeSelector startTime={startTime} setStartTime={setStartTime}/>
				<div className="info">End Time: {endTime}</div>

				<h2>Time Blocks</h2>
				{timeSlots.map((ts,i) => (<SlotEditor index={i} key={i} slot={ts} setTimeslots={setTimeslots} timeSlots={timeSlots}/>))}
				<div className="info">Total Time: {totalTime}</div>

				<button onClick={addSlot}><PlusIcon/> Add Block</button>

				<h2>Display</h2>
				<Checkbox label="Show Clock" checked={showClock} onChange={setShowClock}/>



			</div>
	</div>)
}