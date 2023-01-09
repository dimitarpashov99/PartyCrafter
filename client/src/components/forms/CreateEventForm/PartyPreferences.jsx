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
    CardMedia,
    CardContent,
    FormControl,
    Modal,
    Backdrop,
    Select,
    MenuItem,
    Fade,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@mui/material";
import Slider from "react-slick";
import { ControlPoint } from "@mui/icons-material";

const demoPlayLists = [
    {
        id: uuidv4(),
        label: "Party Music #1",
        coverSrc:
            "https://i.scdn.co/image/ab67616d0000b273a2ba0d5bafc996571434e9bf",
        songList: [
            {
                id: uuidv4(),
                name: "Song#1",
                author: "Author",
                length: "3:11",
                ganre: "house",
            },
            {
                id: uuidv4(),
                name: "Song#2",
                author: "Author",
                length: "3:42",
                ganre: "house",
            },
        ],
    },
    {
        id: uuidv4(),
        label: "Summer Hits #2",
        coverSrc:
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cool-music-album-cover-design-template-3324b2b5c69bb9a3cfaed14c71f24ca8.jpg?ts=1572456482",
        songList: [
            {
                id: uuidv4(),
                name: "Song#1",
                author: "Author",
                length: "3:11",
                ganre: "house",
            },
            {
                id: uuidv4(),
                name: "Song#2",
                author: "Author",
                length: "3:42",
                ganre: "house",
            },
        ],
    },
    {
        id: uuidv4(),
        label: "House #3",
        coverSrc:
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cool-music-album-cover-design-template-3324b2b5c69bb9a3cfaed14c71f24ca8.jpg?ts=1572456482",
        songList: [
            {
                id: uuidv4(),
                name: "Song#1",
                author: "Author",
                length: "3:11",
                ganre: "house",
            },
            {
                id: uuidv4(),
                name: "Song#2",
                author: "Author",
                length: "3:42",
                ganre: "house",
            },
        ],
    },
    {
        id: uuidv4(),
        label: "Party Music#4",
        coverSrc:
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cool-music-album-cover-design-template-3324b2b5c69bb9a3cfaed14c71f24ca8.jpg?ts=1572456482",
        songList: [
            {
                id: uuidv4(),
                name: "Song#1",
                author: "Author",
                length: "3:11",
                ganre: "house",
            },
            {
                id: uuidv4(),
                name: "Song#2",
                author: "Author",
                length: "3:42",
                ganre: "house",
            },
        ],
    },
];

function StepThree(props) {
    const [playlistModalOpen, setPLModalOpen] = useState(false);
    const formState = props.formState;
    const handleFormChange = props.handleFormChange;
    const [chosenPlaylist, setPlaylist] = useState(demoPlayLists[0]);
    const eventMenu = formState.chosenFoodMenu || "";
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
            setPlaylist(demoPlayLists[current]);
            formState.chosenPlaylist = chosenPlaylist;
            handleFormChange(formState);
        },
    };
    useEffect(() => {
        if (
            formState.preferences.music &&
            !formState.chosenPlaylist
        ) {
            setPlaylist(demoPlayLists[0]);
            formState.chosenPlaylist = chosenPlaylist;
            handleFormChange(formState);
        }
    }, [formState, handleFormChange, chosenPlaylist]);
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
                        <Typography variant="body1">
                            {playlist.label}
                        </Typography>
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
                                    checked={
                                        formState.preferences.music
                                    }
                                    onChange={(e) => {
                                        formState.preferences.music =
                                            e.target.checked;
                                        handleFormChange(formState);
                                    }}
                                />
                            }
                            label="Party Music"
                        />
                        {formState.preferences.music && (
                            <React.Fragment>
                                <Box>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setPLModalOpen(true);
                                        }}
                                    >
                                        Show songlist
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        overflow: "hidden",
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="body1">
                                        Choose music playlist:
                                    </Typography>
                                    <Slider {...sliderSettings}>
                                        {demoPlayLists.map((playlist) => {
                                            return (
                                                <React.Fragment
                                                    key={playlist.label}
                                                >
                                                    <PlaylistElement
                                                        playlist={playlist}
                                                    />
                                                </React.Fragment>
                                            );
                                        })}
                                    </Slider>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                    <Modal
                        aria-labelledby="chosen-musicplaylist-modal"
                        open={playlistModalOpen}
                        onClose={() => {
                            setPLModalOpen(false);
                        }}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={playlistModalOpen}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    textAlign: "center",
                                    bgcolor: "background.paper",
                                    border: "2px solid #000",
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography variant="body1">
                                    {chosenPlaylist.label}
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table
                                        sx={{ minWidth: 700 }}
                                        aria-label="customized table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Song</TableCell>
                                                <TableCell>By</TableCell>
                                                <TableCell>Duration</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {chosenPlaylist.songList.map(
                                                (song) => {
                                                    return (
                                                        <React.Fragment
                                                            key={song.id}
                                                        >
                                                            <TableRow>
                                                                <TableCell>
                                                                    {song.name}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        song.author
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        song.length
                                                                    }
                                                                </TableCell>
                                                            </TableRow>
                                                        </React.Fragment>
                                                    );
                                                }
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Fade>
                    </Modal>
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
                            border: "3px solid",
                            borderColor: "#EE5007",
                            borderRadius: "12px",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={
                                        formState.preferences.foodMenu
                                    }
                                    onChange={(e) => {
                                        formState.preferences.foodMenu =
                                            e.target.checked;
                                        handleFormChange(formState);
                                    }}
                                />
                            }
                            label="Foods & Drinks"
                        />
                        {formState.preferences.foodMenu && (
                            <Box sx={{ paddingTop: 5, height: "100%" }}>
                                <Typography variant="body1">Menu:</Typography>
                                <FormControl fullWidth>
                                    <Box sx={{ display: "flex" }}>
                                        <Select
                                            id="event-preferences-menu"
                                            name="event-preferences-menu"
                                            value={eventMenu.id || ""}
                                            onChange={(e) => {
                                                formState.chosenFoodMenu =
                                                    e.target.value;
                                                handleFormChange(formState);
                                            }}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            <MenuItem value="custom-menu-1">
                                                Custom Menu #1
                                            </MenuItem>
                                        </Select>
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                props.handleFoodMenuModalOpen();
                                            }}
                                        >
                                            <ControlPoint />
                                        </Button>
                                    </Box>
                                </FormControl>
                                {eventMenu && (
                                    <Grid container>
                                        <Grid item md={12}>
                                            <Typography variant="body1">
                                                Foods
                                            </Typography>
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                }}
                                            ></Box>
                                        </Grid>
                                        <Grid item md={12}>
                                            <Typography variant="body1">
                                                Drinks
                                            </Typography>
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    paddingBottom: 2,
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
                        <Typography variant="body1">
                            Additional Preferences
                        </Typography>
                        <Box>
                            <FormControlLabel
                                control={<Switch />}
                                label="Allow music requests"
                            />
                            <FormControlLabel
                                control={<Switch />}
                                label="Allow uploading photos"
                            />
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
export { StepThree };
