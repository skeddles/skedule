import { useState, useRef, useEffect } from 'react';
import calculateElapsedPercentage from '../utils/calculate-elapsed-percentage';
import TimeSlot from './TimeSlot';
import { timeslot } from '../types/timeSlot';

import '../css/Timeline.css';

interface TimelineProps {
    timeSlots: timeslot[];
    startTime: number;
}

export default function Timeline ({timeSlots, startTime}: TimelineProps) {

    const [elapsedPercentage, setElapsedPercentage] = useState(calculateElapsedPercentage(startTime, timeSlots));
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
    const fillStyle = {width: (elapsedPercentage * 100) + '%'};

    useEffect(() => {
        setElapsedPercentage(calculateElapsedPercentage(startTime, timeSlots));
    }, [timeSlots, startTime]);

    useEffect(() => {
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            setElapsedPercentage(calculateElapsedPercentage(startTime, timeSlots));
        }, 1000);

        return () => clearInterval(timer.current);
    }, [startTime, timeSlots]);

    return (
        <div className="Timeline">
            <div className="fill" style={fillStyle}></div>
            {timeSlots.map((ts, i) => (<TimeSlot key={i} timeSlot={ts} timeSlots={timeSlots} />))}
        </div>
    )
}