import React from "react";
import {Box, Chip, Container, Grid, Paper, Typography} from "@mui/material";
import ProfileViewElement from "./ProfileViewElement";
import './index.css'
import {CAPTION_EMPTY_GUESTS, CAPTION_EMPTY_PROFILES} from "../Constants/TextMessagesRu";

const GuestsView = ({visitors}) => {
    return (
            <div className="d-block m-1 ">
                {visitors?.length ?
                    <Grid container spacing={1} >
                        {visitors?.map(elem => (
                            <ProfileViewElement profile={elem}/>
                        ))}
                    </Grid>
                    :
                    <div className="d-flex justify-content-center flex-row mt-2">
                        <Chip label={CAPTION_EMPTY_GUESTS.toUpperCase()} color={"primary"} variant={"outlined"}/>
                    </div>}
            </div>
    );
}

export default GuestsView;