
import '../css/TimeSelector.css'

interface TimeSelectorProps {
	startTime: number,
	setStartTime: Function
}

function minutesToTime(minutesSinceMidnight: number) {
	const hours = (Math.floor(minutesSinceMidnight/60) % 12).toString().padStart(2, '0')
	const minutes = (minutesSinceMidnight % 60).toString().padStart(2, '0');
	const ampm = minutesSinceMidnight < 720 ? 'AM' : 'PM';
	return hours + ':' + minutes + ' ' + ampm;
}

function timeToMinutes(time: string) {
	const hours = parseInt(time.slice(0, 2));
	const minutes = parseInt(time.slice(3, 5));
	const ampm = time.slice(6, 8);
	const addPmHours = ampm === 'PM' ? 12 : 0;
	return (hours+addPmHours) * 60 + minutes;
}

export default function TimeSelector({startTime, setStartTime}: TimeSelectorProps) {

	const time = minutesToTime(startTime);

	function input (event: React.FormEvent<HTMLInputElement>) {
		
		const cursorPosition = event.currentTarget.selectionStart || 9;
		const inputCharacter = event.currentTarget.value[cursorPosition - 1];

		console.log({
			inputCharacter,
			isNum: /[0-9]/.test(inputCharacter),
			cursorPosition,
			currentTarget: event.currentTarget
		});

		//if input character is a number
		if (/[0-9]/.test(inputCharacter)) {
			const inputNum = parseInt(inputCharacter);
			if (cursorPosition === 1 && inputNum < 2) {
				let newTime = inputCharacter + time.slice(1);
				console.log('typed into the first postistion, setting time to ', newTime,timeToMinutes(newTime));
				setStartTime(timeToMinutes(newTime));
			}
			if (cursorPosition === 2) {
				let newTime = time.slice(0, 1) + inputCharacter + time.slice(2);
				console.log('typed into the second postistion, setting time to ', newTime,timeToMinutes(newTime));
				setStartTime(timeToMinutes(newTime));
			}
			if (cursorPosition === 4 && inputNum < 6) {
				let newTime = time.slice(0, 3) + inputCharacter + time.slice(4);
				console.log('typed into the fourth postistion, setting time to ', newTime,timeToMinutes(newTime));
				setStartTime(timeToMinutes(newTime));
			}
			if (cursorPosition === 5) {
				let newTime = time.slice(0, 4) + inputCharacter + time.slice(5);
				console.log('typed into the fifth postistion, setting time to ', newTime,timeToMinutes(newTime));
				setStartTime(timeToMinutes(newTime));
			}
		}

		//if input character is a colon
		if (inputCharacter === ":" && cursorPosition === 3) {
			event.currentTarget.setSelectionRange(cursorPosition, cursorPosition+1);
		}

		if (inputCharacter === "a") {
			let newTime = time.slice(0, 5) + " AM";
			setStartTime(timeToMinutes(newTime));
		}
		if (inputCharacter === "p") {
			let newTime = time.slice(0, 5) + " PM";
			setStartTime(timeToMinutes(newTime));
		}	

		//set the cursor position
		event.currentTarget.setSelectionRange(cursorPosition, cursorPosition);
	}


	return (<div className="TimeSelector">
		<input value={time} onInput={input}/>
	</div>)
}