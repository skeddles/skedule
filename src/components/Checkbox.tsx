import '../css/Checkbox.css';

import Check from '../assets/check.svg?react';

interface CheckboxProps {
	label: string;
	checked: boolean;
	onChange: Function;
}

export default function Checkbox({label, checked, onChange}: CheckboxProps) {
	return (
		<label className="checkbox">
			<input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}/>
			<div><Check/></div>
			{label}
		</label>
	)
}