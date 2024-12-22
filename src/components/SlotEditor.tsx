import { timeslot } from '../types/timeSlot';

import HuePicker from '../components/HuePicker';

import '../css/SlotEditor.css'
import TrashIcon from '../assets/trash.svg?react'

interface SlotEditorProps {
	index: number;
	slot: timeslot;
	setTimeslots: Function;
	timeSlots: timeslot[];
}

export default function SlotEditor({index, slot, setTimeslots, timeSlots}: SlotEditorProps) {

	function updateLength(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(e.target.value);

		const newLength = parseInt(e.target.value);

		const newSlots = timeSlots.map((ts,i) => {
			if (i === index) 
				return {...ts, length: newLength};
			else return ts;
		});

		setTimeslots(newSlots);
	}

	function updateName(e: React.ChangeEvent<HTMLInputElement>) {
		setTimeslots(timeSlots.map((ts,i) => {
			if (i === index) 
				return {...ts, name: e.target.value};
			else return ts;
		}));
	}

	function updateHue(newHue: number) {
		setTimeslots(timeSlots.map((ts,i) => {
			if (i === index) 
				return {...ts, hue: newHue};
			else return ts;
		}));
	}

	function deleteSlot() {
		setTimeslots(timeSlots.filter((ts) => ts.name !== slot.name));
	}

	return (<div className="SlotEditor">
		<input type="text" value={slot.name} onChange={updateName} />
		<input type="number" value={slot.length} onChange={updateLength}/>
		<HuePicker value={slot.hue} setValue={updateHue}/>
		<button onClick={deleteSlot}><TrashIcon/></button>
	</div>)
}