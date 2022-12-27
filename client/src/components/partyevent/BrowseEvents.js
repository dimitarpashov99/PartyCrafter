import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

import partyEventsService from "../../services/partyEventsService";

export default function BrowseEvents() {
    const [openPartyEvents, setOpenEvents] = useState(null);

    useEffect(() => {
        var openEventsResponse = partyEventsService.getOpenPartyEvents();
        if (openEventsResponse && openEventsResponse.length > 0) {
            setOpenEvents(openEventsResponse);
        }
    }, [openPartyEvents]);

    return <Box className="browse-events"></Box>;
}
