import React, {useState} from "react";
import {Chip, Fab, Grid} from "@mui/material";
import ProfileViewElement from "../Guests/ProfileViewElement";
import {CAPTION_EMPTY_PROFILES} from "../Constants/TextMessagesRu";
import { SearchOutlined} from "@mui/icons-material";
import BottomDrawer from "../Componetns/Drawers/BottomDrawer";
import SearchBox from "./SearchBox";

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

/**
 * Компанент, показывающий список профилей для поиска пользователя по критерию
 * @param profiles
 * @returns {JSX.Element}
 * @constructor
 */
const SearchProfiles = ({profiles}) => {
    const [openSearch, setOpenSearch] = useState(false);


    return (
        <div style={{overflowY: 'scroll', position: 'relative'}} className="d-block m-1 h-100">
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
            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => {setOpenSearch(!openSearch)}}>
                <SearchOutlined />
            </Fab>
            <BottomDrawer isOpen={openSearch} onClosed={() => {setOpenSearch(false)}}>
                <SearchBox />
            </BottomDrawer>
        </div>
    );
}

export default SearchProfiles;