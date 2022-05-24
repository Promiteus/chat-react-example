import React, {useEffect, useState} from "react";
import {Chip, ImageList} from "@mui/material";
import ProfileViewElement from "../Guests/ProfileViewElement";
import {CAPTION_EMPTY_PROFILES, kidsVal} from "../Constants/TextMessagesRu";
import { SearchOutlined} from "@mui/icons-material";
import BottomDrawer from "../Componetns/Drawers/BottomDrawer";
import SearchBox from "./SearchBox";
import useWindowDimensions, {D_LG, D_MD, D_SM, D_XL, D_XS} from "../Hooks/useWindowDimension";
import UserProfilesSkeletons from "../Componetns/Skeletons/UserProfilesSkeletons";
import IconFab from "../Componetns/Fabs/IconFab";
import ScrollDownLoader from "../Componetns/ScrollLoaders/ScrollDownLoader";

const fabStyle = {
    position: 'absolute',
    bottom: 25,
    right: 36,
    zIndex: 999
};

let result = [];
let status = 200;

/**
 * Компанент, показывающий список профилей для поиска пользователя по критерию
 * @param profiles
 * @returns {JSX.Element}
 * @constructor
 */
const SearchProfiles = ({userId}) => {
    const colsMap = new Map([
        [D_XS, 2],
        [D_SM, 2],
        [D_MD, 3],
        [D_LG, 4],
        [D_XL, 5],
    ]);
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

    const [page, setPage] = useState(0);
    const [openSearch, setOpenSearch] = useState(false);
    const [imgCols, setImgCols] = useState(5);
    const {dimType} = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState([]);


    useEffect(() => {
        setImgCols(colsMap.get(dimType));
    }, [dimType]);


    function onSearch(params) {
        setSearchParams(params);
        setPage(0);

        let searchBody = {};
        Object.assign(searchBody, params);
        searchBody.kids = kidsVal(params.kids);


      //  profileDispatch(userProfileSearchAsync({userId: userId, page: 0, searchBody: searchBody}));
        setOpenSearch(false);
    }

    /**
     * Запросить у api искомых пользователей постранично
     * @param {number} aPage
     */
    function loadNextPage(aPage) {
        if (+status === 200) {

        }
    }

    return (
        <div className="d-block m-1 h-100 position-relative">
            <ScrollDownLoader loadNextPage={loadNextPage} data={result} loading={loading}>
                {/*Скелетон-прелодер для первой страницы*/}
                {((loading) && (page === 0)) && <UserProfilesSkeletons count={20} />}
                {/*Загружаемый контент постранично (фотокарточки пользователей)*/}
                {((searched?.length) && (+status === 200) && (loading === false)) ?
                    <ImageList cols={imgCols}>
                        {searched?.map((elem) => (
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
            </ScrollDownLoader>
            {/*<Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => {setOpenSearch(!openSearch)}}>
                <SearchOutlined />
            </Fab>*/}
            <IconFab
                icon={<SearchOutlined />}
                bgColor={"#6c34ef"}
                ariaLabel={'add'}
                iconColor={'#ff7700'}
                fabStyle={fabStyle}
                onClick={() => {setOpenSearch(!openSearch)}}
            />
        </div>
    );
};

export default SearchProfiles;