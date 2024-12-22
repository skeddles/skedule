import { timeslot } from '../types/timeSlot';
import minutesToTime from '../utils/minutes-to-time';

import SlotEditor from './SlotEditor'
import TimeSelector from './TimeSelector';

import '../css/Settings.css'
import plusIcon from '../assets/plus.svg'

export default function TimelineEditor({isOpen, timeSlots, setTimeslots, startTime, setStartTime}: {isOpen: boolean, timeSlots: timeslot[], setTimeslots: Function, startTime: number, setStartTime:Function}) {

	const totalMinutes = timeSlots.reduce((acc, ts) => acc + ts.length, 0);
	const totalTime = Math.floor(totalMinutes/60) + ':' + (totalMinutes%60).toString().padStart(2, '0');

	const endTime = minutesToTime(startTime + totalMinutes);

	function addSlot() {
		setTimeslots([...timeSlots, {name: 'slot'+timeSlots.length, length: 30, hue: Math.random()*360}]);
	}
	
	return (<div className={"Settings"+ (isOpen?' open':'')}>

			<div className="container">
		

				<h1>Settings</h1>

				<h2>Start Time</h2>
				<TimeSelector startTime={startTime} setStartTime={setStartTime}/>
				
				<h2>Time Slots</h2>
				{timeSlots.map((ts,i) => (<SlotEditor index={i} key={i} slot={ts} setTimeslots={setTimeslots} timeSlots={timeSlots}/>))}


				<button onClick={addSlot}><img src={plusIcon} /> Add Slot</button>

				<div className="info">
					Total Time: {totalTime}<br/>
					End Time: {endTime}
				</div>

				<div className="tipping">
					<p>Like this tool?</p>
					<a href='https://ko-fi.com/R5R345YO' target='_blank'><img height='36' style={{border: '0px', height: '36px'}} src='https://storage.ko-fi.com/cdn/kofi1.png?v=6'  alt='Buy Me a Coffee at ko-fi.com' /></a>
				</div>
			</div>
	</div>)
}