import React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
function EventPreview(props) {
  const eventData = props.formState;
  const [eventImage, setImage] = useState();
  useEffect(() => {
    console.log(eventData);
    if (!eventData.eventImage) {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(eventData.eventImage);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [eventData]);
  return (
    <Box sx={{ maxWidth: "70vw" }}>
      <Grid container spacing={2}>
        <Grid md={6} item sx={{ gridAutoFlow: "column" }}>
          <Box
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              border: "3px solid",
              borderRadius: "12px",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h6">Event info</Typography>
            <Box>
              <Grid container>
                <Grid item md={6} sx={{ textAlign: "center" }}>
                  <Stack spacing={1} sx={{ textAlign: "start" }}>
                    <Typography variant="body1">
                      Party Title: {"\n"} {eventData.eventTitle}
                    </Typography>
                    <Typography variant="body1">
                      Date: {eventData.eventDate.toLocaleString()}
                    </Typography>
                    <Typography variant="body1">
                      Access: {eventData.privateEvent ? "Private" : "Public"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item md={6}>
                  {eventImage && (
                    <Box
                      sx={{
                        border: "3px solid",
                        borderColor: "primary.main",
                        borderRadius: "12px",
                      }}
                    >
                      <img className="preview-img" src={eventImage} alt="" />
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  <Typography variant="body1">Description:</Typography>
                  <Typography variant="body1">
                    {eventData.eventDescription}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid md={6} item sx={{ gridAutoFlow: "column" }}>
          <Box
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "start",
              alignContent: "start",
              flexDirection: "column",
              border: "3px solid",
              borderRadius: "12px",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h6">Location</Typography>
            <Typography variant="body1">{eventData.eventAddress}</Typography>
          </Box>
        </Grid>
        <Grid md={6} item sx={{ gridAutoFlow: "column" }}>
          <Box
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              border: "3px solid",
              borderRadius: "12px",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h6">Guest List</Typography>

            {eventData.guestList && (
              <Box sx={{ height: "300px" }}>
                <DataGrid
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                  rows={eventData.guestList}
                  columns={[
                    { field: "name", headerName: "Guest Name", width: 150 },
                    { field: "email", headerName: "Guest Email", width: 150 },
                    { field: "phone", headerName: "Guest Phone", width: 150 },
                  ]}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid md={6} item sx={{ gridAutoFlow: "column" }}>
          <Box
            sx={{
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              border: "3px solid",
              borderRadius: "12px",
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h6">Additional info</Typography>
            <Grid container spacing={1}>
              <Grid item md={6}>
                <Box
                  sx={{
                    padding: 2,
                    border: "3px solid",
                    borderColor: "#B22727",
                    borderRadius: "12px",
                  }}
                >
                  <Typography variant="body1">Music</Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                <Box
                  sx={{
                    padding: 2,
                    height: "100%",
                    border: "3px solid",
                    borderColor: "#EE5007",
                    borderRadius: "12px",
                  }}
                >
                  <Typography variant="body1">Foods & Drinks</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventPreview;
