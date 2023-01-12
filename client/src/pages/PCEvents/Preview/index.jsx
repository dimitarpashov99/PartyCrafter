import { Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import EventPreview from "../../../components/partyevent/EventPreview";
import partyEventsService from "../../../services/partyEventsService";

const Preview = () => {
    const { code } = useParams();
    const [eventData, setEventData] = useState();

    useEffect(() => {
        if (!eventData) {
            partyEventsService.getEvent(code).then((result) => {
                console.log(result);
                setEventData(result.data);
            });
        }
    });
    return eventData ? (
        <EventPreview formState={eventData} />
    ) : (
        <Skeleton height="100%" />
    );
};

export default Preview;
