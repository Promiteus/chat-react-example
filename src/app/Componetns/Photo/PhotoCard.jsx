import React from "react";
import {NO_PHOTO_PNG} from "../../../assets";
import {CardMedia} from "@mui/material";
import IconFab from "../Fabs/IconFab";
import {Add, Edit} from "@mui/icons-material";

/**
 *
 * @param {string} imgUrl
 * @param {string} alt
 * @param {string} key
 * @param {number} height
 * @param {any} onClick
 * @param {boolean} isAdd
 * @returns {JSX.Element}
 * @constructor
 */
const PhotoCard = ({imgUrl, alt, key, height, onClick, isAdd}) => {
   const fabStyle = {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 999
   };

   return(
       <>
           {imgUrl &&
           <IconFab fabStyle={fabStyle} icon={<Edit/>} bgColor={"#ff7700"}/>}
           {(!(imgUrl) && (isAdd)) &&
           <IconFab fabStyle={fabStyle} icon={<Add/>} bgColor={"#6c34ef"} iconColor={"#ff7700"}/>}
           <CardMedia
               component="img"
               key={key}
               height={height}
               image={imgUrl || NO_PHOTO_PNG}
               alt={alt || 'no photo'}
               sx = {{padding: 1}}
               onClick={onClick}
           />
       </>
   );
}

export default PhotoCard;