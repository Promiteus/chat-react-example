import React from 'react';
import {useSelector} from "react-redux";
import {LeftChevronSvg} from "../../Svg";
import {Avatar, Divider, IconButton, Typography} from "@mui/material";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {selectUserChatCommon} from "../../Stores/slices/UserProfileChatCommonSlice";

function TopHeaderView ({onBack, navButtonSx})  {
    const {profile} = useSelector(selectUserChatCommon);


    return (
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center my-1">
                <div className="d-flex flex-row align-items-center" onClick={onBack}>
                    <IconButton sx={{display: navButtonSx}}>
                        <LeftChevronSvg />
                    </IconButton>
                </div>
                <div className="d-flex flex-row align-content-center">
                    {profile?.firstName ?
                        <div className="d-flex flex-column align-items-end">
                            <Typography variant={"subtitle1"} className="m-0 p-0"><b>{profile?.firstName} {profile?.lastName}</b></Typography>
                            <Typography variant={"body2"} className="m-0 p-0">Возраст: {profile?.age}</Typography>
                        </div> :
                        <div></div>}
                    <div className="border-dark d-flex p-1">
                        {profile?.thumbUrl?.src ?
                            <Avatar alt={profile?.firstName} src={`${BASE_DATA_URL}${profile?.thumbUrl?.src}`}/> :
                            <Avatar src="/static/images/avatar/2.jpg" />
                        }
                    </div>
                </div>
            </div>
            <Divider/>
        </div>
    );
}


export default TopHeaderView;
