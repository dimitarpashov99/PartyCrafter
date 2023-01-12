import React from "react";
import { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
    Typography,
    TextField,
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Box,
    Grid,
    Stack,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { v4 as uuidv4 } from "uuid";

export default function MusicPlaylistForm(props) {
    const [newMusicTrack, setNewMusicTrack] = useState({
        id: uuidv4(),
        title: "",
        author: "",
        type: 0,
    });

    const [customPlaylist, setCustomPlaylist] = useState({
        user: props.user || "admin",
        name: "",
        tracks: [],
    });
    const [selectedFile, setSelectedFile] = useState();
    const [coverImage, setImage] = useState();
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
        setSelectedFile(e.target.files[0]);
    };
    return (
        <Box>
            <Box sx={{ paddingBottom: 3 }}>
                <Typography variant="h6">
                    Customize your personal music playlists
                </Typography>
            </Box>
            <Box component="form">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: 2,
                    }}
                >
                    <TextField
                        label="Playlist"
                        value=""
                        onChange={(ev) => {
                            setNewMusicTrack({
                                ...customMenu,
                                name: ev.target.value,
                            });
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            const result = setCustomPlaylist(customMenu);
                            if (result?.success) {
                                props.handleCreatePlaylists(result);
                            }
                        }}
                    >
                        Create
                    </Button>
                </Box>
                <Box>
                    <Stack direction="column">
                        <Typography variant="body1" color="primary">
                            Event Image
                        </Typography>
                        {selectedFile && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setImage(undefined);
                                    setSelectedFile(undefined);
                                }}
                                color="error"
                            >
                                Change
                            </Button>
                        )}
                        <Box
                            sx={{
                                display: "none",
                                border: "3px solid",
                                borderColor: "primary.main",
                            }}
                        >
                            <input
                                accept="image/*"
                                id="event-image-file"
                                name="event-image-file"
                                type="file"
                                onChange={handleUploadClick}
                            />
                        </Box>
                        <Box
                            sx={{
                                border: "3px solid",
                                borderColor: "primary.main",
                                borderRadius: "12px",
                                height: "100%",
                                maxWidth: 300
                            }}
                        >
                            {selectedFile ? (
                                <img
                                    className="preview-img"
                                    src={coverImage}
                                    alt=""
                                />
                            ) : (
                                <Button
                                    variant="outlined"
                                    sx={{ width: "100%", height: "100%" }}
                                >
                                    <label htmlFor="event-image-file">
                                        <AddPhotoAlternateIcon />
                                        UPLOAD
                                    </label>
                                </Button>
                            )}
                        </Box>
                    </Stack>
                </Box>
                <Grid
                    container
                    sx={{ minWidth: "80vw", justifyContent: "center" }}
                >
                    <Grid item xs={12}>
                        <Box sx={{ paddingBottom: 2 }}>
                            <Typography variant="body1">
                                Add Music to your playlist:
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <React.Fragment>
                                <TextField
                                    label="Track Title"
                                    value={newMusicTrack?.title || ""}
                                    onChange={(ev) => {
                                        setNewMusicTrack((current) => ({
                                            ...current,
                                            title: ev.target.value,
                                        }));
                                    }}
                                />
                                <TextField
                                    label="Author"
                                    value={newMusicTrack?.author || ""}
                                    onChange={(ev) => {
                                        setNewMusicTrack((current) => ({
                                            ...current,
                                            author: ev.target.value,
                                        }));
                                    }}
                                />
                                <TextField
                                    type="number"
                                    InputProps={{
                                        pattern: ":",
                                        min: 0,
                                        max: 60,
                                    }}
                                    label="Duration"
                                    value={newMusicTrack?.duration || ""}
                                    onChange={(ev) => {
                                        setNewMusicTrack((current) => ({
                                            ...current,
                                            duration: ev.target.value,
                                        }));
                                    }}
                                />
                            </React.Fragment>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setCustomPlaylist((current) => ({
                                        ...current,
                                        tracks: [
                                            ...current.tracks,
                                            newMusicTrack,
                                        ],
                                    }));
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
                            Music tracks
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Author</TableCell>
                                        <TableCell>Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customPlaylist?.tracks?.map((track) => {
                                        return (
                                            <React.Fragment key={track.id}>
                                                <TableRow>
                                                    <TableCell>
                                                        {track.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {track.author}
                                                    </TableCell>
                                                    <TableCell>
                                                        {track.duration}
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
