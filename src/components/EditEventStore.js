import axios from "axios";
import React, {useState} from "react";
import CalendarComp from "./CalendarComp";

function EditEventItem(props) {
    const [date, setDate] = useState("" + props.id.list_event.date )
    const [desc, setDesc] = useState("" + props.id.list_event.event)

    const editEventHandler = () => {
        axios.put('http://localhost:8000/events/' + props.id.list_event.id,
            { 'date': date.date, 'event': desc}).then(res =>
        console.log(res.data))
        props.id.list_event.event = desc
        props.id.list_event.date = date.date
        props.editClick()
    }

    const updateDate = (newDate, func) => {
       setDate({
          ['date']: newDate
       }, func)
    }

    return (
            <tr>
                <th scope="row">
                    <span style={{ fontWeight: 'bold, underline' }}>
                        {props.id.list_event.id}</span>
                </th>
                <th>
                    <CalendarComp updateDate={updateDate}/>
                </th>
                <th>
                    <input className="mb-2 form-control eventIn" onChange={event =>
                    setDesc(event.target.value)} defaultValue={props.id.list_event.event}/>
                </th>
                <th>
                    <button className="btn btn-outline-primary mx-2 mb-3"
                        style={{'borderRadius':'50px', "fontWeight":"bold"}}
                        onClick={editEventHandler}> Edit Event
                    </button>
                </th>
                <th>
                    <button className="btn btn-outline-secondary mx-2 mb-3"
                        style={{'borderRadius':'50px', "fontWeight":"bold"}}
                        onClick={props.editClick}> Cancel Edit
                    </button>
                </th>
            </tr>
    )
}

export default EditEventItem;
