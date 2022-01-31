import React, {useEffect, useState} from "react";
import {Chip, Fab, Grid, ImageList} from "@mui/material";
import ProfileViewElement from "../Guests/ProfileViewElement";
import {CAPTION_EMPTY_PROFILES, kidsVal} from "../Constants/TextMessagesRu";
import { SearchOutlined} from "@mui/icons-material";
import BottomDrawer from "../Componetns/Drawers/BottomDrawer";
import SearchBox from "./SearchBox";
import {useDispatch, useSelector} from "react-redux";
import {
    selectSearchProfile,
    userProfileSearchAsync
} from "../Stores/slices/UserProfileSearchSlice";
import useWindowDimensions, {D_LG, D_MD, D_SM, D_XL, D_XS} from "../Hooks/useWindowDimension";


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
const SearchProfiles = ({userId}) => {
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
    const [imgCols, setImgCols] = useState(5);

    const profileDispatch = useDispatch();
    const {status, response, loading} = useSelector(selectSearchProfile);
    const {dimType} = useWindowDimensions();
    const colsMap = new Map([
        [D_XS, 2],
        [D_SM, 2],
        [D_MD, 3],
        [D_LG, 5],
        [D_XL, 6],
    ]);

    useEffect(() => {
        setImgCols(colsMap.get(dimType));
    }, [dimType]);

    function onSearch(params) {
        setSearchParams(params);

        let searchBody = {};
        Object.assign(searchBody, params);
        searchBody.kids = kidsVal(params.kids);

        console.log(JSON.stringify(searchBody));

        profileDispatch(userProfileSearchAsync({userId: userId, page: 0, searchBody: searchBody}));
        setOpenSearch(false);
    }

    /*useEffect(() => {
        if ((+status === 200) && (loading === false)) {
            console.log("response: "+JSON.stringify(response));
        }

    }, [response])*/

    return (
        <div style={{overflowY: 'scroll', position: 'relative'}} className="d-block m-1 h-100">
            {((response?.length) && (+status === 200)) ?
                <ImageList cols={imgCols}>
                    {response?.map(elem => (
                        <ProfileViewElement profile={elem}/>
                    ))}
                </ImageList>
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
};

export default SearchProfiles;