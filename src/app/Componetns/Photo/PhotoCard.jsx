import React, {useEffect, useRef, useState} from "react";
import {NO_PHOTO_PNG} from "../../../assets";
import {CardMedia} from "@mui/material";
import IconFab from "../Fabs/IconFab";
import {AddAPhoto, Edit, Favorite, Stars} from "@mui/icons-material";
import FloatIcon from "../Fabs/FloatIcon";
import {isMainPhoto} from "../../Handlers/ImageHandler";
import { SEX_DATA} from "../../Constants/TextMessagesRu";
import {uploadImageFile} from "../../Stores/api/UploadsApi/UploadFiles";

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
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const [photo, setPhoto] = useState(imgUrl);

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
        zIndex: 1000
    };

    function onAddImage() {
        fileInputRef?.current?.click();
    }

    const onFileChange = (e) => {
        let file = e?.target?.files[0];
        setSelectedFile(file);

        let fReader = new FileReader();
        fReader.readAsDataURL(file);
        fReader.onloadend = function(event){
            setPhoto(event?.target?.result);
            //uploadFile();
        }
    }

    const uploadFile = (file, userId) => {
        const formData = new FormData();
        if ((file) && (userId)) {
            formData.append('user_id', userId);
            formData.append('file', file);
            uploadImageFile(formData).then((res) => {
                console.log("data: "+JSON.stringify(res));
            });
        }
    }

   return(
       <>
           {(imgUrl) && (isEditable) &&
           <IconFab
               fabStyle={fabStyle}
               icon={<Edit/>}
               bgColor={"#ff7700"}
               size={"small"}
           />}

           {(!(imgUrl) && (isAdd) && (isEditable)) &&
           <IconFab
               fabStyle={fabStyle}
               icon={<AddAPhoto/>}
               bgColor={"#6c34ef"}
               iconColor={"#ff7700"}
               size={"small"}
               onClick={onAddImage}
           />}

           {(isMainPhoto(alt, imgUrl) && (isEditable)) &&
           <FloatIcon
               icon={(sex === SEX_DATA[0]?.tag) ? <Stars fontSize="large" sx={{color: "#FF0000"}}/> : <Favorite  fontSize="large" sx={{color: "#ff00DD"}}/>}
               fabStyle={iconFabStyle}
               caption={""}
               color={(sex === SEX_DATA[0]?.tag) ? "#FF0000": "#ff00DD"}
           />}

           <input type="file" multiple={false} onChange={onFileChange} accept="image/*" ref={fileInputRef} hidden/>

           <CardMedia
               component="img"
               key={key}
               height={height}
               image={photo || NO_PHOTO_PNG}
               alt={alt || 'no photo'}
               sx = {{padding: 1}}
               onClick={onClick}
           />
       </>
   );
}

export default PhotoCard;