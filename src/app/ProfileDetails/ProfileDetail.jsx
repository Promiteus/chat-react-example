import React, {useEffect} from "react";
import StandartHeader from "../Componetns/Header/StandartHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectCommon, setPageIndex} from "../Stores/slices/CommonSlice";
import ProfileEditablePage from "../Componetns/ProfilePage/ProfileEditablePage";

const ProfileDetail = ({profile}) => {
    const commonDispatch = useDispatch();
    const {selectedUser} = useSelector(selectCommon);

    useEffect(() => {
       // console.log("ProfileDetail profile: "+JSON.stringify(selectedUser))
    }, []);

    function onBack() {
        commonDispatch(setPageIndex(0));
    }

    return (
        <div className="d-flex flex-column h-100">
            <StandartHeader onClick={onBack}/>
            <div style={{overflowY: 'scroll'}} className="d-flex flex-grow-3 ">
                <ProfileEditablePage profile={selectedUser} isEdit={true}/>
            </div>
        </div>

    );
}

export default ProfileDetail;