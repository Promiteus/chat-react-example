import React, {useEffect, useRef, useState} from "react";


let reqPage = 0;

const ScrollDownLoader = (props) => {
    const downScroll = useRef(null);


    useEffect(() => {
        reqPage = 0;
        props?.loadChatsHistoryNextPage(0);
    }, []);

    useEffect(() => {
        downScroll?.current?.addEventListener("scroll", scrollLoad);

        return () => {
            downScroll?.current?.removeEventListener("scroll", scrollLoad);
        }
    }, []);

    /**
     * Запросить у api посетителей постранично
     * @param {number} aPage
     */
   /* function loadChatsHistoryNextPage(aPage) {
        if (+status == 200) {
            getUserVisitors(userId, aPage, PROFILE_GUESTS_PAGE_SIZE, ((data, err) => {
                status = data?.status;
                if (!err) {
                    result = data?.data;
                    if (data?.data) {
                        setResponse(prevState => prevState.concat(result));
                    }
                } else {
                    result = [];
                }
            }));
        }
    }*/

    function scrollLoad() {
        if ((downScroll?.current?.scrollTop + downScroll?.current?.clientHeight) >= downScroll?.current?.scrollHeight) {
            loadMore();
        }
    }

    /**
     * Выполняется для подрузки данных постранично при прокрутке вниз
     */
    function loadMore() {
        if (reqPage === 0) {
            reqPage++;
        } else if (reqPage > 0) {
            reqPage = reqPage + (props?.result?.length > 0 ? 1: 0);
            console.log("guestsPage: "+reqPage);
        }
        props?.loadChatsHistoryNextPage(reqPage);
    }

    return (
        <div ref={downScroll} style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
            {props.children}
        </div>
    );
}

export default ScrollDownLoader;