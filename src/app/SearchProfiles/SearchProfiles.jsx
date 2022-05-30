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
import {searchUserProfiles} from "../Stores/api/ChatDataApi/ChatDataApi";
import {useDispatch, useSelector} from "react-redux";
import {selectScrollLoader, setPage} from "../Stores/slices/ScrollLoaderSlice";

const fabStyle = {
    position: 'absolute',
    bottom: 25,
    right: 36,
    zIndex: 999
};

let result = [];
let status = 200;
let searchParams = {
    kids: 0,
    ageFrom: 18,
    ageTo: 55,
    sexOrientation: null,
    meetPreferences: null,
    sex: null,
    familyStatus: null,
    country: "Россия",
    region: "",
    locality: ""
}

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

    //const [page, setPage] = useState(0);
    const [openSearch, setOpenSearch] = useState(false);
    const [imgCols, setImgCols] = useState(5);
    const {dimType} = useWindowDimensions();
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState([]);

    const {page} = useSelector(selectScrollLoader);
    const searchDispatcher = useDispatch();


    useEffect(() => {
        setImgCols(colsMap.get(dimType));
    }, [dimType]);

    useEffect(() => {console.log("page: "+page);}, [page]);

    useEffect(() => {
        return () => {
            result = [];
            status = 200;
        }
    }, []);

    function dropParams() {
        searchDispatcher(setPage(0));
        status = 200;
        setSearched([]);
        result = [];
    }

    function onSearch(params) {
        searchParams = params;
        dropParams();

        let searchBody = {};
        Object.assign(searchBody, params);
        searchBody.kids = kidsVal(params.kids);

        loadNextPage(0);

        setOpenSearch(false);
    }

    /**
     * Запросить у api искомых пользователей постранично
     * @param {number} aPage
     */
    function loadNextPage(aPage) {
        if (+status === 200) {
            searchUserProfiles(userId, aPage, searchParams, ((data, err) => {
                status = data?.status;
                setLoading(+status === 200);
                if (!err) {
                    result = data?.data;
                    if (data?.data) {
                        setSearched(prevState => prevState.concat(result));
                    }
                } else {
                    result = [];
                }
                setLoading(false);
            }));
        }
    }

    return (
        <div className="d-block m-1 h-100 position-relative">
            <ScrollDownLoader loadNextPage={loadNextPage} data={result} loading={loading} isStartLoad={false} isDropPage={result?.length == 0}>
                {/*Скелетон-прелодер для первой страницы*/}
                {((loading) && (page === 0)) && <UserProfilesSkeletons count={20} />}
                {/*Загружаемый контент постранично (фотокарточки пользователей)*/}
                {((searched?.length) && (loading === false)) ?
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