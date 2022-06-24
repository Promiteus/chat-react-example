import React from "react";
import {Fab} from "@mui/material";


/**
 *
 * @param onClick
 * @param {string} bgColor
 * @param {string} iconColor
 * @param {string} ariaLabel
 * @param {JSX.Element} icon
 * @param {string} size
 * @returns {JSX.Element}
 * @constructor
 */
const IconFab = ({onClick, bgColor, iconColor, ariaLabel, icon, fabStyle, size}) => {
    return (
       <>
           <Fab
               aria-label={ariaLabel || ''}
               sx={{...fabStyle, backgroundColor: bgColor || '#FFFFFF', color: iconColor || '#000000'}}
               onClick={onClick}
               size={size || 'large'}
           >
               {icon}
           </Fab>
       </>
    );
}

export default IconFab;