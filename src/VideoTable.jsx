import React, {useEffect, useState} from 'react';
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const VideoTable = () => {

    const [videos, setVideos] = useState([]);

    const [fetchError, setFetchError] = useState(null);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log('useEffect is called.');
        const fetchItems = async () => {
            console.log("Fetch videos ...");
            try {
                const response = await fetch('http://localhost:8080/videos');
                if (!response.ok) {
                    console.log(response);
                    throw Error('Did not receive an expected data.');
                }
                const videos = await response.json();
                setVideos(videos.content);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        setIsLoading(true);
        fetchItems();
    }, []);

    return (
        <>
            {isLoading && <CircularProgress data-testid="progress-spinner"/>}
            {!isLoading && fetchError && <p data-testid="error-message" style={{color: 'red'}}>{`Error: ${fetchError}`}</p>}
            {!isLoading && !fetchError && <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table" data-testid="videos-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Created On</TableCell>
                            <TableCell align="center">Published On</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videos.map((video) => (
                            <TableRow
                                key={video.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {video.id}
                                </TableCell>
                                <TableCell align="center">{video.title}</TableCell>
                                <TableCell align="center">{video.createdOn}</TableCell>
                                <TableCell align="center">{video.publishedOn}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
};

export default VideoTable;
