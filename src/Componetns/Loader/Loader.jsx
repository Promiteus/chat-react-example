import React from "react";
import {Box, CircularProgress} from "@mui/material";


const Loader = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </>
    )
}

export default Loader;