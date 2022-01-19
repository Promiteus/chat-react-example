import React, {useState} from "react";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {Divider} from "@mui/material";
//import ImgsViewer from "react-images-viewer/src/ImgsViewer";
import Viewer from 'react-viewer';


/**
 * ProfileDetail profile:
 * {
 * "id":"200",
 * ...
 * "imgUrls":[
 * "/api/resource?user_id=200&file_id=ford_mustang_ford_avtomobil_226678_1280x1024.jpg",
 * "/api/resource?user_id=200&file_id=Снимок экрана от 2021-10-12 14-22-20.png",
 * "/api/resource?user_id=200&file_id=Снимок экрана от 2021-10-07 11-47-49.png"
 * ],"thumbUrl":"/api/resource/thumb?user_id=200"
 * }
 *
 * */

const DesktopGallery = ({profile}) => {
    const [isOpen, setOpen] = useState();

    function getFullUrls() {
        return (profile?.imgUrls?.length > 0) ? profile?.imgUrls.map(elem => ({src: `${BASE_DATA_URL}${elem}`})) : [{src: ''}];
    }

    return(
        <>
            <div className="d-flex flex-row justify-content-center align-content-center">

            </div>
            <Divider/>
        </>

    )
}

export default DesktopGallery;