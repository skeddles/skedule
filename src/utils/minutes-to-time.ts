const TWELVE_HOURS = 12*60;

export default function minutesToTime (minutes:number) {
	const twelveHourMinutes = minutes%TWELVE_HOURS;
	const hours = Math.floor(twelveHourMinutes/60);
	const mins = (minutes%60).toString().padStart(2, '0');
	const ampm = minutes > TWELVE_HOURS ? 'PM' : 'AM';
	return hours + ':' + mins + ' ' + ampm;
}