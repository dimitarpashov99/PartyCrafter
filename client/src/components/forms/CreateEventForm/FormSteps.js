import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Card,
  Grid,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  CardMedia,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Slider from "react-slick";
import { DataGrid } from "@mui/x-data-grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function PageOne(props) {
  const [eventImage, setImage] = useState();
  const formState = props.formState;
  const handleFormChange = props.handleFormChange;
  const [selectedFile, setSelectedFile] = useState(formState.eventImage);
  const handleChangeDate = (newValue) => {
    var eventData = formState;
    eventData.eventDate = newValue;
    handleFormChange(eventData);
  };
  useEffect(() => {
    if (!selectedFile) {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const handleUploadClick = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    formState.eventImage = e.target.files[0];
    handleFormChange(formState);
    setSelectedFile(e.target.files[0]);
  };
  return (
    <Box>
      <Grid container>
        <Grid
          item
          md={6}
          sx={{
            padding: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            id="event-title"
            name="event-title"
            label="Event Title"
            margin="normal"
            required
            autoComplete="off"
            autoFocus
            value={formState.eventTitle}
            onChange={(e) => {
              formState.eventTitle = e.target.value;
              handleFormChange(formState);
            }}
          />
          <TextField
            id="event-description"
            name="event-description"
            label="Event Description"
            multiline
            minRows={5}
            value={formState.eventDescription}
            onChange={(e) => {
              formState.eventDescription = e.target.value;
              handleFormChange(formState);
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formState.privateEvent}
                onChange={(e) => {
                  formState.privateEvent = e.target.checked;
                  handleFormChange(formState);
                }}
              />
            }
            label="Private Event"
          />
          <Box sx={{ padding: 5 }}>
            <DateTimePicker
              label="Event Date"
              value={formState.eventDate}
              onChange={handleChangeDate}
              ampm={false}
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
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            padding: 5,
          }}
        >
          <Typography variant="body1">Event Image</Typography>
          <Box sx={{ display: "none" }}>
            <input
              accept="image/*"
              id="event-image-file"
              name="event-image-file"
              type="file"
              onChange={handleUploadClick}
            />
          </Box>
          {selectedFile ? (
            <Box
              sx={{
                border: "3px solid",
                borderColor: "primary.main",
                borderRadius: "12px",
              }}
            >
              <img className="preview-img" src={eventImage} />
            </Box>
          ) : (
            <label htmlFor="event-image-file">
              <AddPhotoAlternateIcon />
            </label>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
function PageTwo(props) {
  const center = { lat: 48.8584, lng: 2.2945 };
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [guests, setGuests] = useState([
    {
      id: uuidv4(),
      name: "Host",
      email: "partyhost@mail.com",
      phone: "+359 999 9999",
    },
  ]);
  const formState = props.formState;
  const handleFormChange = props.handleFormChange;
  const [newGuest, setNewGuest] = React.useState({
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
  });
  const handleAddGuest = () => {
    if (newGuest.name !== "") {
      setGuests([...guests, newGuest]);
      setNewGuest({
        id: guests.length + 1,
        name: "",
        email: "",
        phone: "",
      });
      formState.guestList = guests;
      handleFormChange(formState);
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item md={6} sx={{ width: "100%", padding: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="body1">Location:</Typography>

            {/* <Autocomplete> */}
            <TextField
              id="event-address"
              name="event-address"
              label="Event address"
              margin="normal"
              required
              fullWidth
              autoComplete="off"
              value={formState.eventAddress}
              onChange={(e) => {
                formState.eventAddress = e.target.value;
                handleFormChange(formState);
              }}
            />
            {/* </Autocomplete> */}
            <Box sx={{ width: "100%", height: 300 }}>
              {isLoaded && (
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
              )}
            </Box>
          </Box>
        </Grid>
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
                  label="Guest Name"
                  value={newGuest.name}
                  onChange={(e) => {
                    setNewGuest({ ...newGuest, name: e.target.value });
                  }}
                />
                <TextField
                  id="event-guestinput-email"
                  margin="normal"
                  fullWidth
                  label="Guest Email"
                  value={newGuest.email}
                  onChange={(e) => {
                    setNewGuest({ ...newGuest, email: e.target.value });
                  }}
                />
                <TextField
                  id="event-guestinput-phone"
                  margin="normal"
                  fullWidth
                  label="Guest Phone"
                  value={newGuest.phone}
                  onChange={(e) => {
                    setNewGuest({ ...newGuest, phone: e.target.value });
                  }}
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
                  onClick={handleAddGuest}
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
        <Grid item sx={{ paddingTop: 5, width: "100%" }}>
          <Box sx={{ height: "300px" }}>
            <DataGrid
              pageSize={20}
              rowsPerPageOptions={[20]}
              rows={guests}
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

function PageThree(props) {
  const demoPlayLists = [
    {
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
    },
    {
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
    },
    {
      label: "Party Music#3",
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
    },
    {
      label: "Party Music#4",
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
    },
  ];
  const formState = props.formState;
  const handleFormChange = props.handleFormChange;
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [eventMenu, setMenu] = React.useState();
  const sliderSettings = {
    centerMode: true,
    infinite: true,
    speed: 500,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    afterChange: (current) => {
      setActiveSlide(current);
    },
  };
  const PlaylistElement = (props) => {
    let playlist = props.playlist;
    return (
      <Box sx={{ paddingX: 2 }}>
        <Card sx={{ width: "100%" }}>
          <CardMedia
            component="img"
            alt={playlist.label}
            image={playlist.coverSrc}
            height={200}
          ></CardMedia>
          <CardContent>
            <Typography variant="body1">{playlist.label}</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  };
  return (
    <Box>
      <Grid container>
        <Grid item md={6} sx={{ maxWidth: "100vw", padding: 5 }}>
          <Box
            sx={{
              padding: 2,
              border: "3px solid",
              borderColor: "#B22727",
              borderRadius: "12px",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formState.preferences.musicPreference}
                  onChange={(e) => {
                    formState.preferences.musicPreference = e.target.checked;
                    handleFormChange(formState);
                  }}
                />
              }
              label="Party Music:"
            />
            {formState.preferences.musicPreference && (
              <Box
                sx={{
                  overflow: "hidden",
                  width: "100%",
                  paddingTop: 5,
                }}
              >
                <Typography variant="body1">Choose music playlist:</Typography>
                <Slider {...sliderSettings}>
                  {demoPlayLists.map((playlist) => {
                    return (
                      <React.Fragment key={playlist.label}>
                        <PlaylistElement playlist={playlist} />
                      </React.Fragment>
                    );
                  })}
                </Slider>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            width: "100%",
            maxWidth: "100vw",
            padding: 5,
            gridAutoFlow: "column",
          }}
        >
          <Box
            sx={{
              padding: 2,
              height: "100%",
              border: "3px solid",
              borderColor: "#EE5007",
              borderRadius: "12px",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formState.preferences.foodPreference}
                  onChange={(e) => {
                    formState.preferences.foodPreference = e.target.checked;
                    handleFormChange(formState);
                  }}
                />
              }
              label="Foods & Drinks"
            />
            {formState.preferences.foodPreference && (
              <Box sx={{ paddingTop: 5, height: "100%" }}>
                <Typography variant="body1">Menu:</Typography>
                <FormControl fullWidth>
                  <Select
                    id="event-preferences-menu"
                    name="event-preferences-menu"
                    value=""
                    onChange={(e) => {
                      setMenu(e.target.value);
                    }}
                  >
                    <MenuItem value={"custom-menu-1"}>Custom Menu #1</MenuItem>
                  </Select>
                </FormControl>
                {eventMenu && (
                  <Grid container>
                    <Grid item md={6}>
                      <Typography variant="body1">Food</Typography>
                      <Box
                        sx={{
                          height: "100%",
                          border: "3px solid",
                          borderColor: "primary",
                          borderRadius: "12px",
                        }}
                      ></Box>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="body1">Drink</Typography>
                      <Box
                        sx={{
                          height: "100%",
                          border: "3px solid",
                          borderColor: "primary",
                          borderRadius: "12px",
                        }}
                      ></Box>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            width: "100%",
            maxWidth: "100vw",
            paddingX: 5,
            gridAutoFlow: "column",
          }}
        >
          <Box
            sx={{
              padding: 2,
              border: "3px solid",
              borderColor: "primary.main",
              borderRadius: "12px",
            }}
          >
            <Typography variant="body1"> Additional Preferences</Typography>
            <Box>
              <FormControlLabel
                control={<Switch />}
                label="Allow music requests"
              />
              <FormControlLabel
                control={<Switch />}
                label="Allow uploading photos"
              />
              <FormControlLabel control={<Switch />} label="Enable Chat" />
              <FormControlLabel
                control={<Switch />}
                label="Allow guest invites"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export { PageOne, PageTwo, PageThree };
