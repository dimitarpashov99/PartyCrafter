import React from "react";
import { useState } from "react";
import playlistService from '../../../services/playlistServices'

const CreateMusicPlaylistForm = () => {
    const [musicPlaylist, setMusicPlaylist] = useState({});
    const [newPlaylist, setNewPlaylist] = useState({});
    const createCustomPlaylist = () => {

    }
    return (
        <>
            <Box sx={{ paddingBottom: 3 }}>
                <Typography variant="h6">
                    Create a custom playlist for your party
                </Typography>
            </Box>
            <Box component="form">
                <Typography variant="body1">Menu Name:</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: 2,
                    }}
                >
                    <TextField
                        id="menu_name"
                        label=""
                        value=""
                        onChange={(ev) => {
                            setMusicPlaylist((current) => ({
                                ...current,
                                title: ev.target.value,
                            }));
                        }}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => {
                            createCustomPlaylist();
                        }}
                    >
                        Create
                    </Button>
                </Box>
                <Grid
                    container
                    sx={{ minWidth: "80vw", justifyContent: "center" }}
                >
                    <Grid item lg={6} sx={{ paddingX: 5 }}>
                        <Box sx={{ paddingBottom: 2 }}>
                            <Typography variant="body1">
                                Add music track to your playlist:
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <React.Fragment>
                                <TextField
                                    id="new_track"
                                    label="Track title"
                                    value={newPlaylist.name || ""}
                                    onChange={(ev) => {
                                        setNewPlaylist({
                                            ...newPlaylist.name,
                                            name: ev.target.value,
                                        });
                                    }}
                                />
                            </React.Fragment>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setMusicPlaylist({
                                        trackList: [
                                            ...musicPlaylist.trackList,
                                            newTrack,
                                        ],
                                    });
                                }}
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item lg={6} sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" sx={{ paddingBottom: 2 }}>
                            Music Tracks
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Track Title</TableCell>
                                        <TableCell>Author</TableCell>
                                        <TableCell>Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {musicPlaylist.trackList.map((item) => {
                                        return (
                                            <React.Fragment key={item.id}>
                                                <TableRow>
                                                    <TableCell>
                                                        {item.title}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.author}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.duration}
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
        </>
    );
};

export default CreateMusicPlaylistForm;
