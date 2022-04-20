import React, {useEffect} from "react";
import {NO_PHOTO_PNG} from "../../../assets";
import {CardMedia} from "@mui/material";
import IconFab from "../Fabs/IconFab";
import {AddAPhoto, Edit, Favorite, Stars} from "@mui/icons-material";
import FloatIcon from "../Fabs/FloatIcon";
import {isMainPhoto} from "../../Handlers/ImageHandler";
import { SEX_DATA} from "../../Constants/TextMessagesRu";

/**
 *
 * @param {string} imgUrl
 * @param {string} alt
 * @param {string} key
 * @param {number} height
 * @param {any} onClick
 * @param {boolean} isAdd
 * @param {string} sex
 * @param {boolean} isEditable
 * @returns {JSX.Element}
 * @constructor
 */
const PhotoCard = ({imgUrl, alt, key, height, onClick, isAdd, sex, isEditable}) => {
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

    useEffect(() => {
        console.log("isEdit: "+isEditable);
    }, []);

   return(
       <>
           {(imgUrl) && (isEditable) &&
           <IconFab
               fabStyle={fabStyle}
               icon={<Edit/>}
               bgColor={"#ff7700"}
               size={"small"}
           />}
           {console.log("isEdit mid: "+isEditable)}
           {(!(imgUrl) && (isAdd) && (isEditable)) &&
           <IconFab
               fabStyle={fabStyle}
               icon={<AddAPhoto/>}
               bgColor={"#6c34ef"}
               iconColor={"#ff7700"}
               size={"small"}
           />}

           {(isMainPhoto(alt, imgUrl) && (isEditable)) &&
           <FloatIcon
               icon={(sex === SEX_DATA[0]?.tag) ? <Stars fontSize="large" sx={{color: "#FF0000"}}/> : <Favorite fontSize="large" sx={{color: "#ff00DD"}}/>}
               fabStyle={iconFabStyle}
               caption={""}
               color={(sex === SEX_DATA[0]?.tag) ? "#FF0000": "#ff00DD"}
           />}

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