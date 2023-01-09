import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const PartyEventsCalendar = (props) => {
    const { events } = props;
    return (
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    );
};
export default PartyEventsCalendar;
