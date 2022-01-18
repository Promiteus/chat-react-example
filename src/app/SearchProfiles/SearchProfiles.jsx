import React from "react";
import {Chip, Grid, Paper, Typography} from "@mui/material";
import ProfileViewElement from "../Guests/ProfileViewElement";
import {CAPTION_EMPTY_PROFILES} from "../Constants/TextMessagesRu";

/**
 * Компанент, показывающий список профилей для поиска пользователя по критерию
 * @param profiles
 * @returns {JSX.Element}
 * @constructor
 */
const SearchProfiles = ({profiles}) => {

    return (
        <div style={{overflowY: 'scroll'}} className="d-block m-1 h-100">
            {profiles?.length ?
                <Grid container spacing={1} >
                    {profiles?.map(elem => (
                        <ProfileViewElement profile={elem}/>
                    ))}
                </Grid>
                :
                <div className="d-flex justify-content-center flex-row mt-2">
                    <Chip label={CAPTION_EMPTY_PROFILES.toUpperCase()} color={"primary"} variant={"outlined"}/>
                </div>
                }
        </div>
    );
}

export default SearchProfiles;