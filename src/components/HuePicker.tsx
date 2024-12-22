import {useState, useRef } from 'react';
import hueToHsl from '../utils/hue-to-hsl';
import '../css/HuePicker.css';

export default function HuePicker({value, setValue}: {value: number, setValue: Function}) {

	const [currentlyDragging, setCurrentlyDragging] = useState(false);

	const coloredBackground = {backgroundColor: hueToHsl(value)}
	const rotationAngle = {transform: `rotate(${value}deg)`}
	const hideMouseCapture = {display: 'none'}

	const picker = useRef<HTMLDivElement>(null);
	const mouseCaptureElement = useRef<HTMLDivElement>(null);

	function handleMouseMove (e: React.MouseEvent<HTMLDivElement>) {
		if (currentlyDragging && picker.current) {
			const rect = picker.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const angle = Math.atan2(y - rect.height/2, x - rect.width/2) * 180 / Math.PI;
			const hue = (angle + 360 + 90) % 360;

			console.log({mouseX:e.clientX, mouseY:e.clientY, x, y, angle, hue});
			setValue(hue);
		}
	}

	return (<div ref={picker} className={"HuePicker"+(currentlyDragging?' dragging':'')} style={coloredBackground} onMouseDown={() => setCurrentlyDragging(true)}>
		<div className="angle" style={rotationAngle}>
			<div className="dot"></div>
		</div>
		<div className="mouseCapture" ref={mouseCaptureElement} onMouseUp={() => setCurrentlyDragging(false)} onMouseMove={handleMouseMove} style={currentlyDragging?{}:hideMouseCapture}></div>
	</div>)
}