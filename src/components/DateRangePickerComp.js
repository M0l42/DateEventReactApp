import React, { useEffect, useRef, useState} from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";

import '../App.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';

const DateRangePickerComp = ({getEventHandler}) => {

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    const [open, setOpen] = useState(false)

    const refOne = useRef(null)

    const searchEventHandler = () => {
        getEventHandler(range[0].startDate, range[0].endDate)
    }

    useEffect(() => {
        // setCalendar(format(new Date(), 'yyyy-MM-dd'))
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        if( e.key === 'Escape') {
            setOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    return(
        <div className="calendarWrap">

            <input
                value={format(range[0].startDate, 'yyyy-MM-dd') + " to " + format(range[0].endDate, 'yyyy-MM-dd')}
                readOnly
                className="inputBox"
                onClick={ () => setOpen(open => !open) }
            />

            <button onClick={() => searchEventHandler()}
                        className="btn btn-outline-primary my-2 mx-2"
                        style={{'borderRadius': '50px',}}>Search</button>

            <div ref={refOne}>
                {open &&
                    <DateRangePicker
                        onChange={item => setRange([item.selection])}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={2}
                        direction="horizontal"
                        className="calendarElement"
                    />
                }
            </div>
        </div>
    )
}

export default DateRangePickerComp