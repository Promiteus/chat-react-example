import React from "react";
import {NO_PHOTO_PNG} from "../../../assets";
import {CardMedia} from "@mui/material";
import IconFab from "../Fabs/IconFab";
import { AddAPhoto, Edit, Stars} from "@mui/icons-material";
import FloatIcon from "../Fabs/FloatIcon";
import {isMainPhoto} from "../../Handlers/ImageHandler";

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
        top: 15,
        right: 15,
        zIndex: 999
   };

    const iconFabStyle = {
        position: 'absolute',
        bottom: 15,
        left: 15,
        zIndex: 999
    };

   return(
       <>
           {imgUrl &&
           <IconFab fabStyle={fabStyle} icon={<Edit/>} bgColor={"#ff7700"} size={"small"}/>}
           {(!(imgUrl) && (isAdd)) &&
           <IconFab fabStyle={fabStyle} icon={<AddAPhoto/>} bgColor={"#6c34ef"} iconColor={"#ff7700"} size={"small"}/>}
           {(isMainPhoto(alt, imgUrl)) &&
           <FloatIcon icon={<Stars fontSize="large" sx={{color: "#FF0000"}}/>} fabStyle={iconFabStyle}/>}
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