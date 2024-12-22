export default function getMinutesIntoToday() {
	const hours = new Date().getHours();
	const minutes = new Date().getMinutes();
	return 60 * hours + minutes;
}