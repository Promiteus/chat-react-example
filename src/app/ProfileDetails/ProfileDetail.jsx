import React, {useEffect} from "react";
import StandartHeader from "../Componetns/Header/StandartHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectCommon, setPageIndex} from "../Stores/slices/CommonSlice";
import ProfileEditablePage from "../Componetns/ProfilePage/ProfileEditablePage";

const ProfileDetail = ({currentUserId}) => {
    const commonDispatch = useDispatch();
    const {selectedUser} = useSelector(selectCommon);

    function onBack() {
        commonDispatch(setPageIndex(0));
    }

    return (
        <div className="d-flex flex-column h-100">
            <StandartHeader onClick={onBack}/>
            <div style={{overflowY: 'scroll'}} className="d-flex flex-grow-3 ">
                <ProfileEditablePage profile={selectedUser} currentUserId={currentUserId} isEdit={false}/>
            </div>
        </div>

    );
}

export default ProfileDetail;