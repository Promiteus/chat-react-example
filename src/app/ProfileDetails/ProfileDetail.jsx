import React, {useEffect} from "react";
import StandartHeader from "../Components/Header/StandartHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectCommon, setPageIndex} from "../Stores/slices/CommonSlice";
import ProfileEditablePage from "../Components/ProfilePage/ProfileEditablePage";
import {updateUserVisitor} from "../Stores/api/VisitorApi/VisitorApi";

const ProfileDetail = ({currentUserId}) => {
    const commonDispatch = useDispatch();
    const {selectedUser} = useSelector(selectCommon);

    function onBack() {
        commonDispatch(setPageIndex(0));
    }

    useEffect(() => {
        let visit = setTimeout(() => {
            //console.log("visitorUserId: "+currentUserId+" userId: "+selectedUser?.id);
            updateUserVisitor(selectedUser?.id, currentUserId, (data, err) => {});
        }, 5000);
        return () => {
            clearTimeout(visit);
        }
    }, []);

    return (
        <div className="d-flex flex-column h-100 my-profile">
            <StandartHeader onClick={onBack}/>
            <div style={{overflowY: 'scroll'}} className="d-flex flex-grow-3 ">
                <ProfileEditablePage profile={selectedUser} currentUserId={currentUserId} isEdit={false}/>
            </div>
        </div>

    );
}

export default ProfileDetail;