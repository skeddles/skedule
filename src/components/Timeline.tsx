import TimeSlot from './TimeSlot';
import { timeslot } from '../types/timeSlot';

import '../css/Timeline.css';

interface TimelineProps {
    elapsedPercentage: number;
	timeSlots: timeslot[];
}

export default function Timeline ({elapsedPercentage,timeSlots}: TimelineProps) {

    const fillStyle = {width: (elapsedPercentage * 100) + '%'};

    return (
        <div className="Timeline">
            <div className="fill" style={fillStyle}></div>
            {timeSlots.map((ts, i) => (<TimeSlot key={i} timeSlot={ts} timeSlots={timeSlots} />))}
        </div>
    )
}