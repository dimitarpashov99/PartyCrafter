import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router";
import EventPreview from "../../../components/partyevent/EventPreview";
import { AuthConsumer } from "../../../contexts";
import partyEventsService from "../../../services/partyEventsService";

const Preview = () => {
    const { code } = useParams();
    const { auth } = AuthConsumer();
    const [eventData, setEventData] = useState(undefined);

    useEffect(() => {
        if (!eventData) {
            partyEventsService.getEvent(code).then((result) => {
                setEventData(result.data);
            });
        }
    });

    return eventData ? (
        <EventPreview
            formState={eventData}
            showCommentForm={auth.profile?.id !== eventData.hostId}
        />
    ) : (
        <Skeleton height="100%" />
    );
};

export default Preview;
