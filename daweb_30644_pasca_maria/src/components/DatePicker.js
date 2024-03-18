import * as React from 'react';
import { DateRange } from 'react-date-range';
import { useState } from 'react'; 
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function RangeDatePicker() {
    const [chooseDate, setChooseDate] = useState(false);
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleChange = (ranges) => {
        setDate(ranges.selection);
    };

    const handleClick = () => {
        setChooseDate((prev) => !prev);
    };

    return (
        <div style={{display:"block", marginTop:"-5%"}}>
            <span onClick={handleClick} class="date">
                {
                    `${format(date.startDate, 'dd.MM.yy')} to ${format(date.endDate, 'dd.MM.yy')}` 
                }
            </span>
            {chooseDate && <DateRange
                ranges={[date]}
                onChange={handleChange}
                minDate={new Date()}
            />}
        </div>
    );
}