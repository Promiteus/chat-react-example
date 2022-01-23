import React from "react";
import {Box, Chip, Container, Grid, ImageList, Paper, Typography} from "@mui/material";
import ProfileViewElement from "./ProfileViewElement";
import './index.css'
import {CAPTION_EMPTY_GUESTS, CAPTION_EMPTY_PROFILES} from "../Constants/TextMessagesRu";

const GuestsView = ({visitors}) => {
    return (
            <div style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
                {visitors?.length ?
                    <ImageList cols={5}>
                        {visitors?.map(elem => (
                                <ProfileViewElement key={elem?.id} profile={elem}/>
                        ))}
                    </ImageList>
                    :
                    <div className="d-flex justify-content-center flex-row mt-2">
                        <Chip label={CAPTION_EMPTY_GUESTS.toUpperCase()} color={"primary"} variant={"outlined"}/>
                    </div>}
            </div>
    );
}

export default GuestsView;