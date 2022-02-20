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
import {Skeleton} from "@mui/lab";
import UserProfilesSkeletons from "../Componetns/Skeletons/UserProfilesSkeletons";


const fabStyle = {
    position: 'absolute',
    bottom: 25,
    right: 36,
    zIndex: 999
};

/**
 * Компанент, показывающий список профилей для поиска пользователя по критерию
 * @param profiles
 * @returns {JSX.Element}
 * @constructor
 */
const SearchProfiles = ({userId}) => {
    const [page, setPage] = useState(0);
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

    useEffect(() => {
        if ((+status === 200) && (!loading) && (response?.length > 0)) {
            setPage(page+1);
            console.log("page: "+page);
        }

    }, [response]);

    function onSearch(params) {
        setSearchParams(params);
        setPage(0);

        let searchBody = {};
        Object.assign(searchBody, params);
        searchBody.kids = kidsVal(params.kids);


        profileDispatch(userProfileSearchAsync({userId: userId, page: 0, searchBody: searchBody}));
        setOpenSearch(false);
    }

    return (
        <div className="d-block m-1 h-100 position-relative">
            <div style={{overflowY: loading ? 'hidden': 'scroll', position: 'relative'}} className="d-block m-1 h-100">
                {/*Скелетон-прелодер для первой страницы*/}
                {((loading) && (page === 0)) && <UserProfilesSkeletons count={20} />}
                {/*Загружаемый контент постранично (фотокарточки пользователей)*/}
                {((response?.length) && (+status === 200) && (loading === false)) ?
                    <ImageList cols={imgCols}>
                        {response?.map((elem) => (
                            <ProfileViewElement key={elem?.id} profile={elem}/>
                        ))}
                    </ImageList>
                    :
                    <div className="d-flex justify-content-center flex-row mt-2">
                        <Chip label={CAPTION_EMPTY_PROFILES.toUpperCase()} color={"primary"} variant={"outlined"}/>
                    </div>
                }
                {/*Скелетон-прелодер для последующих страниц*/}
                {((loading) && (page > 0)) && <div></div>}

                <BottomDrawer isOpen={openSearch} onClosed={() => {setOpenSearch(false)}}>
                    <SearchBox onClose={onSearch} defaultParams={searchParams}/>
                </BottomDrawer>
            </div>
            <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => {setOpenSearch(!openSearch)}}>
                <SearchOutlined />
            </Fab>
        </div>
    );
};

export default SearchProfiles;