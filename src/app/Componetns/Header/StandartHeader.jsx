import React from "react";
import {Divider, IconButton} from "@mui/material";
import {LeftChevronSvg} from "../../Svg";

const StandartHeader = ({onClick}) => {

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-start">
                <IconButton onClick={onClick}>
                    <LeftChevronSvg/>
                </IconButton>
            </div>
            <Divider />
        </div>
    );
}

export default StandartHeader;