import React from "react";
import RoundSubstrate from "../../Svg/Sunstrate/RoundSubstrate";
import {Typography} from "@mui/material";

const IconSubTitle = ({icon, text, font, dataText}) => {
    return(
        <div className="d-flex flex-row justify-content-start align-items-center">
            <RoundSubstrate color="orange" children={icon} />
            <Typography variant={font || 'h5'} className="mx-2">{(dataText) ? `${text} ${dataText}`: `${text}`}</Typography>
        </div>
    );
}

export default IconSubTitle;