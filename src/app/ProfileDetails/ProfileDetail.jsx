import React, {useEffect} from "react";
import StandartHeader from "../Componetns/Header/StandartHeader";
import {useDispatch} from "react-redux";
import {setPageIndex} from "../Stores/slices/CommonSlice";

const ProfileDetail = ({profile}) => {
    const commonDispatch = useDispatch();

    useEffect(() => {
        console.log("ProfileDetail profile: "+JSON.stringify(profile))
    }, []);

    function onBack() {
        commonDispatch(setPageIndex(0));
    }

    return (
        <div className="d-flex flex-column h-100">
            <StandartHeader onClick={onBack}/>
            <div style={{overflowY: 'scroll'}} className="d-flex flex-grow-3 h-100">

            </div>
        </div>

    );
}

export default ProfileDetail;