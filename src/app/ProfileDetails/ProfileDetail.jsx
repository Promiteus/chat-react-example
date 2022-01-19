import React, {useEffect} from "react";
import StandartHeader from "../Componetns/Header/StandartHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectCommon, setPageIndex} from "../Stores/slices/CommonSlice";
import DesktopGallery from "../Componetns/Gallary/DesktopGallery";

const ProfileDetail = ({profile}) => {
    const commonDispatch = useDispatch();
    const {selectedUser} = useSelector(selectCommon);

    useEffect(() => {
        console.log("ProfileDetail profile: "+JSON.stringify(selectedUser))
    }, []);

    function onBack() {
        commonDispatch(setPageIndex(0));
    }

    return (
        <div className="d-flex flex-column h-100">
            <StandartHeader onClick={onBack}/>
            <DesktopGallery profile={profile}/>
            <div style={{overflowY: 'scroll'}} className="d-flex flex-grow-3 h-100">

            </div>
        </div>

    );
}

export default ProfileDetail;