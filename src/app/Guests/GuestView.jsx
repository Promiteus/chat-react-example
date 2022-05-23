import React, {useEffect, useRef, useState} from "react";
import { Chip, ImageList } from "@mui/material";
import ProfileViewElement from "./ProfileViewElement";
import './index.css'
import {CAPTION_EMPTY_GUESTS} from "../Constants/TextMessagesRu";
import useWindowDimensions, {D_LG, D_MD, D_SM, D_XL, D_XS} from "../Hooks/useWindowDimension";
import {getUserVisitors} from "../Stores/api/VisitorApi/VisitorApi";
import {PROFILE_CHATS_PAGE_SIZE, PROFILE_GUESTS_PAGE_SIZE} from "../Stores/api/Common/ApiCommon";


let imgCols = 5;
let guestsPage = 0;
let vis = [];

const GuestsView = ({visitors, userId}) => {
    const {dimType} = useWindowDimensions();
    const colsMap = new Map([
        [D_XS, 2],
        [D_SM, 2],
        [D_MD, 3],
        [D_LG, 4],
        [D_XL, 5],
    ]);
    const guestsScroll = useRef(null);
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        imgCols = colsMap.get(dimType);
    }, [dimType]);

    useEffect(() => {
        guestsPage = 0;
        loadChatsHistoryNextPage(0);
    }, []);

    useEffect(() => {
        guestsScroll?.current?.addEventListener("scroll", scrollLoad);

        return () => {
            guestsScroll?.current?.removeEventListener("scroll", scrollLoad);
        }
    }, []);

    /**
     * Запросить у api посетителей постранично
     * @param {number} aPage
     */
    function loadChatsHistoryNextPage(aPage) {
        getUserVisitors(userId, aPage, PROFILE_GUESTS_PAGE_SIZE, ((data, err) => {
           if (!err) {
               setGuests(data?.data);
               vis = data?.data;
           }
        }));
    }

    function scrollLoad() {
        if ((guestsScroll?.current?.scrollTop + guestsScroll?.current?.clientHeight) >= guestsScroll?.current?.scrollHeight) {
            loadMore();
            console.log("load visitors");
        }
    }

    /**
     * Выполняется для подрузки данных постранично при прокрутке вниз
     */
    function loadMore() {
        if (guestsPage === 0) {
            guestsPage++;
        } else if (guestsPage > 0) {
            guestsPage = guestsPage + (guests?.length > 0 ? 1: 0);
        }
        loadChatsHistoryNextPage(guestsPage);
    }

    return (
            <div ref={guestsScroll} style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
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
            </div>
    );
}

export default GuestsView;