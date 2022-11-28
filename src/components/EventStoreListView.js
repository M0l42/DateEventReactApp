import React from "react";
import EventItem from "./EventStore";

function EventStoreListView(props) {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Event</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                {props.eventList.data?.map((list_event) => <EventItem list_event={list_event}/>)}
            </table>
        </div>
    )
}

export default EventStoreListView