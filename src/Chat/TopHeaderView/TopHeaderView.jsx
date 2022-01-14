import React from 'react';
import {useSelector} from "react-redux";
import {LeftChevronSvg} from "../../Svg";
import {Avatar, Divider, Paper, Typography} from "@mui/material";
import {BASE_DATA_URL} from "../../Stores/api/Common/ApiCommon";
import {stringAvatar} from "../../Componetns/GraphicHandler";
import {selectCommon} from "../../Stores/slices/CommonSlice";
import {dateDiffYears} from "../../Componetns/DateHandlers";


function TopHeaderView (props)  {
    const {selectedUser} = useSelector(selectCommon);


    return (
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center my-1">
                <LeftChevronSvg />
                <div className="d-flex flex-row align-content-center">
                    <div className="d-flex flex-column align-items-end">
                        <Typography variant={"subtitle1"} className="m-0 p-0"><b>{selectedUser?.firstName} {selectedUser?.lastName}</b></Typography>
                        <Typography variant={"body2"} className="m-0 p-0">Возраст: {dateDiffYears(selectedUser?.birthDate, new Date().toDateString())}</Typography>
                    </div>
                    <div className="border-dark d-flex p-1">
                        {selectedUser?.thumbUrl ?
                            <Avatar alt={selectedUser?.firstName} src={`${BASE_DATA_URL}${selectedUser?.thumbUrl}`}/> :
                            <Avatar {...stringAvatar(`${selectedUser?.firstName} ${selectedUser?.lastName}`)} />
                        }
                    </div>
                </div>
            </div>
            <Divider/>
        </div>
    );
}


export default TopHeaderView;
