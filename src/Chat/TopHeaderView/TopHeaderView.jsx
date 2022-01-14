import React from 'react';
import {useDispatch} from "react-redux";
import {LeftChevronSvg} from "../../Svg";
import {Avatar, Paper, Typography} from "@mui/material";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {stringAvatar} from "../../Componetns/GraphicHandler";
import {dateDiffYears} from "../../Componetns/DateHandlers";
import RightChevron from "../../Svg/RightChevron";


function TopHeaderView ({user})  {
    const dispatch = useDispatch();

    function click(e) {

    }

    return (
        <div className="d-flex flex-row justify-content-start">
            <LeftChevronSvg />
            <div className="d-flex flex-row">
                <div className="border-dark d-flex p-1">
                    {user?.thumbUrl ?
                        <Avatar alt={user?.firstName} src={`${BASE_DATA_URL}${user?.thumbUrl}`}/> :
                        <Avatar {...stringAvatar(`${user?.firstName} ${user?.lastName}`)} />
                    }
                </div>
                <div className="d-flex flex-row justify-content-start flex-grow-1">
                    <div className="d-flex flex-column">
                        <Typography variant={"subtitle1"}>{user?.firstName} {user?.lastName}</Typography>
                        <Typography variant={"body2"}>Возраст: {dateDiffYears(user?.birthDate, new Date().toDateString())}</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopHeaderView;
