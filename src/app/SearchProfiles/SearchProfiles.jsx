import React, {useState} from "react";
import {Chip, Fab, Grid} from "@mui/material";
import ProfileViewElement from "../Guests/ProfileViewElement";
import {CAPTION_EMPTY_PROFILES, kidsVal} from "../Constants/TextMessagesRu";
import { SearchOutlined} from "@mui/icons-material";
import BottomDrawer from "../Componetns/Drawers/BottomDrawer";
import SearchBox from "./SearchBox";
import {useDispatch} from "react-redux";
import {userProfileSearchAsync} from "../Stores/slices/UserProfileSearchSlice";


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
const SearchProfiles = ({profiles, userId}) => {
    const [openSearch, setOpenSearch] = useState(false);
    const [searchParams, setSearchParams] = useState({
        kids: 0,
        ageFrom: 18,
        ageTo: 55,
        sexOrientation: "HETERO",
        meetPreferences: "ALL",
        sex: "MAN",
        familyStatus: null,
        country: "Россия",
        region: "",
        locality: ""
    });
    const profileDispatch = useDispatch();

    function onSearch(params) {
        setSearchParams(params);
        console.log(JSON.stringify(params));

        let searchBody = {};
        Object.assign(searchBody, params);
        searchBody.kids = kidsVal(params.kids);

        profileDispatch(userProfileSearchAsync({userId: userId, page: 0, searchBody: searchBody}));
        setOpenSearch(false);
    }

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
                <SearchBox onClose={onSearch} defaultParams={searchParams}/>
            </BottomDrawer>
        </div>
    );
}

export default SearchProfiles;