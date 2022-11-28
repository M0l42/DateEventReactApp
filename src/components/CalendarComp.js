import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const CalendarComp = ({updateDate}) => {

  // date state
  const [calendar, setCalendar] = useState('')

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle
  const refOne = useRef(null)

  useEffect(() => {
    // set current date on component load
    setCalendar(format(new Date(), 'yyyy-MM-dd'))
    updateDate(format(new Date(), 'yyyy-MM-dd'))
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  // on date change, store date in state
  const handleSelect = (date) => {
    setCalendar(format(date, 'yyyy-MM-dd'))
    updateDate(format(date, 'yyyy-MM-dd'))
  }

  return (
    <div className="calendarWrap">

      <input
        value={ calendar }
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      />

      <div ref={refOne}>
        {open &&
          <Calendar
            date={ new Date() }
            onChange = { handleSelect }
            className="calendarElement"
          />
        }
      </div>

    </div>
  )
}

export default CalendarComp