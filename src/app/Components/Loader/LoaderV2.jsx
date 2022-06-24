import React from "react";
import {CircularProgress} from "@mui/material";

/**
 *
 * @param {int} height
 * @returns {JSX.Element}
 * @constructor
 */
const LoaderV2 = ({height}) => {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center bg-dark">
            <CircularProgress sx={{height: height}}/>
        </div>
    );
}

export default LoaderV2;