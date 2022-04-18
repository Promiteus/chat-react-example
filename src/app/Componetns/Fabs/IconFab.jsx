import React from "react";
import {Fab} from "@mui/material";

const fabStyle = {
    position: 'absolute',
    bottom: 25,
    right: 36,
    zIndex: 999
};

const IconFab = ({onClick, bgColor, iconColor, ariaLabel, icon}) => {
    return (
        <>
            <Fab aria-label={ariaLabel || ''} sx={{...fabStyle, backgroundColor: bgColor || '#FFFFFF', color: iconColor || '#000000'}} onClick={onClick}>
                {icon}
            </Fab>
        </>
    );
}

export default IconFab;