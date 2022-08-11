import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  FormControlLabel,
  Switch,
  Skeleton,
  Typography,
  TextField,
  CardMedia,
  CardContent,
} from "@mui/material";
import Slider from "react-slick";
import { DataGrid } from "@mui/x-data-grid";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
} from "@react-google-maps/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DoNotStepTwoTone } from "@mui/icons-material";

function PageOne(props) {
  const eventDate = props.eventDate;
  const handleChangeDate = props.handleChangeDate;
  return (
    <Box>
      <TextField
        id="event-title"
        name="event-title"
        label="Event Title"
        margin="normal"
        required
        fullWidth
        autoComplete="off"
        autoFocus
      />
      <TextField
        id="event-desription"
        name="event-desription"
        label="Event Desription"
        fullWidth
        multiline
        minRows={5}
      />
      <Box sx={{ padding: 5 }}>
        <FormControlLabel control={<Switch defaultChecked />} label="Private" />
        <DateTimePicker
          label="Event Date"
          value={eventDate}
          onChange={handleChangeDate}
          renderInput={(params) => (
            <TextField
              id="event-date"
              name="event-date"
              label="Event Date"
              {...params}
            />
          )}
        />
      </Box>
    </Box>
  );
}
function PageTwo() {
  const center = { lat: 48.8584, lng: 2.2945 };
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return (
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={210}
        height={118}
      />
    );
  }
  return (
    <Box>
      <Grid container>
        <Grid item md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", padding: 5 }}>
            <Typography variant="body1">Add a guest to your party:</Typography>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  id="event-guestinput-name"
                  margin="normal"
                  fullWidth
                  name="event-guestinput-name"
                  label="Guest Name"
                />
                <TextField
                  id="event-guestinput-email"
                  margin="normal"
                  fullWidth
                  name="event-guestinput-email"
                  label="Guest Email"
                />
                <TextField
                  id="event-guestinput-phone"
                  margin="normal"
                  fullWidth
                  name="event-guestinput-phone"
                  label="Guest Phone"
                />
              </Grid>
              <Grid
                item
                sx={{
                  padding: 2,
                  paddingBottom: { xs: 0, md: 1 },
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "100% ",
                    height: "100%",
                  }}
                >
                  <AddCircleOutlineIcon />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={6} sx={{ width: "100%", padding: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1">Location:</Typography>
            <Autocomplete>
              <TextField
                id="event-address"
                name="event-address"
                label="Event address"
                margin="normal"
                required
                fullWidth
                autoComplete="off"
              />
            </Autocomplete>
            <Box sx={{ width: "100%", height: 300 }}>
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map)}
              ></GoogleMap>
            </Box>
          </Box>
        </Grid>
        <Grid item sx={{ paddingTop: 5, width: "100%" }}>
          <Box sx={{ height: "300px" }}>
            <DataGrid
              pageSize={20}
              rowsPerPageOptions={[20]}
              rows={[
                {
                  id: "1",
                  name: "Host",
                  email: "partyhost@mail.com",
                  phone: "+359 999 9999",
                },
              ]}
              columns={[
                { field: "name", headerName: "Guest Name", width: 200 },
                { field: "email", headerName: "Guest Email", width: 200 },
                { field: "phone", headerName: "Guest Phone", width: 200 },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function PageThree() {
  const sliderSettings = {
    infinite: true,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  };

  const PlaylistElement = (props) => {
    let playlist = props.playlist;
    return (
      <Card sx={{ maxWidth: "200px" }}>
        <CardMedia
          component="img"
          alt={playlist.label}
          image={playlist.coverSrc}
          sx={{ height: "200px", width: "200px" }}
        ></CardMedia>
        <CardContent>
          <Typography variant="body1">{playlist.label}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Grid container>
        <Grid item md={6}>
          <Typography variant="body1">Party Music:</Typography>
          <Box sx={{ flexDirection: "row" }}>
            <Slider {...sliderSettings}>
              <PlaylistElement
                playlist={{
                  label: "Party Music#1",
                  coverSrc:
                    "https://i.scdn.co/image/ab67616d0000b273a2ba0d5bafc996571434e9bf",
                  songList: [
                    {
                      name: "Song#1",
                      author: "Author",
                      length: "3:11",
                      ganre: "house",
                    },
                    {
                      name: "Song#2",
                      author: "Author",
                      length: "3:42",
                      ganre: "house",
                    },
                  ],
                }}
              />
              <PlaylistElement
                playlist={{
                  label: "Party Music#2",
                  coverSrc:
                    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cool-music-album-cover-design-template-3324b2b5c69bb9a3cfaed14c71f24ca8.jpg?ts=1572456482",
                  songList: [
                    {
                      name: "Song#1",
                      author: "Author",
                      length: "3:11",
                      ganre: "house",
                    },
                    {
                      name: "Song#2",
                      author: "Author",
                      length: "3:42",
                      ganre: "house",
                    },
                  ],
                }}
              />
              <PlaylistElement
                playlist={{
                  label: "Party Music#1",
                  coverSrc:
                    "https://i.scdn.co/image/ab67616d0000b273a2ba0d5bafc996571434e9bf",
                  songList: [
                    {
                      name: "Song#1",
                      author: "Author",
                      length: "3:11",
                      ganre: "house",
                    },
                    {
                      name: "Song#2",
                      author: "Author",
                      length: "3:42",
                      ganre: "house",
                    },
                  ],
                }}
              />
              <PlaylistElement
                playlist={{
                  label: "Party Music#1",
                  coverSrc:
                    "https://i.scdn.co/image/ab67616d0000b273a2ba0d5bafc996571434e9bf",
                  songList: [
                    {
                      name: "Song#1",
                      author: "Author",
                      length: "3:11",
                      ganre: "house",
                    },
                    {
                      name: "Song#2",
                      author: "Author",
                      length: "3:42",
                      ganre: "house",
                    },
                  ],
                }}
              />
              <PlaylistElement
                playlist={{
                  label: "Party Music#1",
                  coverSrc:
                    "https://i.scdn.co/image/ab67616d0000b273a2ba0d5bafc996571434e9bf",
                  songList: [
                    {
                      name: "Song#1",
                      author: "Author",
                      length: "3:11",
                      ganre: "house",
                    },
                    {
                      name: "Song#2",
                      author: "Author",
                      length: "3:42",
                      ganre: "house",
                    },
                  ],
                }}
              />
            </Slider>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Box>
            <Typography variant="body1">Foods & Drinks:</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export { PageOne, PageTwo, PageThree };
