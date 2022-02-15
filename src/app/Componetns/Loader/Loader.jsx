import React from "react";
import {Box, CircularProgress} from "@mui/material";

/**
 *
 * @param {int} height
 * @returns {JSX.Element}
 * @constructor
 */
const Loader = ({height}) => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </>
    )
}

export default Loader;