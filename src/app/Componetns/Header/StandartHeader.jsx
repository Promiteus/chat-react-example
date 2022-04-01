import React from "react";
import {Button, Divider, IconButton, Typography} from "@mui/material";
import {LeftChevronSvg} from "../../Svg";
import {ArrowBack, ArrowBackIos, ChatTwoTone} from "@mui/icons-material";
import {CAPTION_BACK, CAPTION_SAVE} from "../../Constants/TextMessagesRu";

const ActionBack = ({onClick}) => {
    return (
        <div className="my-1">
            <div className="d-flex flex-row justify-content-center align-content-center">
                <Button variant={"none"} style={{color: 'orange'}} startIcon={<ArrowBackIos/>} className="mx-1" onClick={onClick}>
                    <Typography variant={"subtitle1"}>{CAPTION_BACK}</Typography>
                </Button>
            </div>
        </div>
    );
}

const StandartHeader = ({onClick}) => {

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-start">
                <ActionBack onClick={onClick}/>
            </div>
            <Divider />
        </div>
    );
}

export default StandartHeader;