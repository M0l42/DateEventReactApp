import axios from "axios";
import React, {useState} from "react";
import EditEventStore from "./EditEventStore";
import format from 'date-fns/format'

function EventItem(props) {
    const [isShown, setIsShown] = useState(false);
    const [gotDeleted, setGotDeleted] = useState(false);

    const editClick = event => {
        setIsShown(current => !current);
    };

    const deleteEventHandler = () => {
        axios.delete('http://localhost:8000/events/' + props.list_event.id).then(res =>
            setGotDeleted(current=> !current)
        )}

    // Don't show element if deleted
    if(gotDeleted){return ""}

    return (
        <tbody>
            {isShown && <EditEventStore id={props} editClick={editClick}/>}
            {!isShown &&
                <tr>
                    <th scope="row">
                        <span style={{ fontWeight: 'bold, underline' }}>
                            {props.list_event.id}</span>
                    </th>
                    <th>
                        <span style={{ fontWeight: 'bold, underline' }}>
                            {format(new Date(props.list_event.date), 'yyyy-MM-dd')}</span>
                    </th>
                    <th>
                        <span style={{ fontWeight: 'bold, underline' }}>
                            {props.list_event.event}</span>
                    </th>
                    <th>
                        <button onClick={editClick}
                            className="btn btn-outline-secondary my-2 mx-2"
                            style={{'borderRadius': '50px',}}>Edit</button>
                    </th>
                    <th>
                        <button onClick={() => deleteEventHandler(props.list_event.id)}
                            className="btn btn-outline-danger my-2 mx-2"
                            style={{'borderRadius': '50px',}}>X</button>
                    </th>
                </tr>
            }

        </tbody>
    )
}

export default EventItem;
