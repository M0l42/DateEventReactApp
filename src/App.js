import './App.css';
import React, {useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import EventStoreListView from "./components/EventStoreListView";
import CalendarComp from "./components/CalendarComp";
import DateRangePickerComp from "./components/DateRangePickerComp";
import format from "date-fns/format";


function App() {
    const [eventList, setEventList] = useState([{}])
    const [date, setDate] = useState('')
    const [desc, setDesc] = useState('')


    const getEventHandler = (start, end) => {
        setEventList([{}])
        if(start && end){
            axios.get('http://localhost:8000/events/' + format(start, 'yyyy-MM-dd') + "_" + format(end, 'yyyy-MM-dd'))
            .then(res => {
                setEventList(res.data)
            })
        }
        else{
            axios.get('http://localhost:8000/events')
            .then(res => {
                setEventList(res.data)
            })
        }
    }

    const updateDate = (newDate, func) => {
       setDate({
          ['date']: newDate
       }, func)
    }

    const addEventHandler = () => {
        axios.post('http://localhost:8000/events',
            { 'date': date.date, 'event': desc})
            .then(res => console.log(res))
    }

  return (
    <div className="App">
        <div className="list-group-item
        justify-content-center align-items-center mx-auto"
             style={{"maxWidth":"800px", "backgroundColor": "wite", "marginTop":"15px"}}>
            <h1 className="card text-white bg-primary mb-1"
            stylename="max-width: 20rem;">Task Manager</h1>

            <h5 className="card text-white bg-dark mb-3">Add an Event</h5>
            <span className="card-text">
                <div className="mb-3">
                    <label className="mx-2">Date : </label>
                    <CalendarComp id='date' updateDate={updateDate}/>
                </div>

                <div className="mb-3">
                <label className="mx-2">Event : </label>
                <input className="mb-2 eventIn" onChange={event =>
                        setDesc(event.target.value)} placeholder='Event Description'/>
                </div>

                <button className="btn btn-outline-primary mx-2 mb-3"
                        style={{'borderRadius':'50px', "fontWeight":"bold"}}
                        onClick={addEventHandler}> Add Event
                </button>
            </span>

            <hr></hr>
            <DateRangePickerComp getEventHandler={getEventHandler}/>

            <button onClick={() => getEventHandler()}
                        className="btn btn-outline-success my-2 mx-2"
                        style={{'borderRadius': '50px',}}>Get All Events</button>
            <h5 className="card text-white bg-dark mb-3">List of Events</h5>
            <div>
                <EventStoreListView eventList={eventList}/>
            </div>
        </div>

    </div>
  );
}

export default App;
