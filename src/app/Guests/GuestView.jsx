import React, {useEffect, useRef, useState} from "react";
import { Chip, ImageList } from "@mui/material";
import ProfileViewElement from "./ProfileViewElement";
import './index.css'
import {CAPTION_EMPTY_GUESTS} from "../Constants/TextMessagesRu";
import useWindowDimensions, {D_LG, D_MD, D_SM, D_XL, D_XS} from "../Hooks/useWindowDimension";
import {getUserVisitors} from "../Stores/api/VisitorApi/VisitorApi";
import { PROFILE_GUESTS_PAGE_SIZE} from "../Stores/api/Common/ApiCommon";
import ScrollDownLoader from "../Componetns/ScrollLoaders/ScrollDownLoader";


let imgCols = 4;
let result = [];
let status = 200;

const GuestsView = ({visitors, userId}) => {
    const {dimType} = useWindowDimensions();
    const colsMap = new Map([
        [D_XS, 2],
        [D_SM, 2],
        [D_MD, 3],
        [D_LG, 4],
        [D_XL, 5],
    ]);
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        imgCols = colsMap.get(dimType);
    }, [dimType]);


    useEffect(() => {
        return () => {
            status = 200;
        }
    }, []);

    /**
     * Запросить у api посетителей постранично
     * @param {number} aPage
     */
    function loadNextPage(aPage) {
        if (+status === 200) {
            setLoading(true);
            getUserVisitors(userId, aPage, PROFILE_GUESTS_PAGE_SIZE, ((data, err) => {
                status = data?.status;
                if (!err) {
                    result = data?.data;
                    if (data?.data) {
                        setGuests(prevState => prevState.concat(result));
                    }
                } else {
                    result = [];
                }
                setLoading(false);
            }));
        }
    }


    return (
            <ScrollDownLoader loadNextPage={loadNextPage} data={result} loading={loading} isStartLoad={true}>
                {guests?.length ?
                    <ImageList cols={imgCols}>
                        {guests?.map(elem => (
                              <ProfileViewElement key={elem?.id} profile={elem}/>
                        ))}
                    </ImageList>
                    :
                    <div className="d-flex justify-content-center flex-row mt-2">
                        <Chip label={CAPTION_EMPTY_GUESTS.toUpperCase()} color={"primary"} variant={"outlined"}/>
                    </div>}
            </ScrollDownLoader>
    );
}

export default GuestsView;