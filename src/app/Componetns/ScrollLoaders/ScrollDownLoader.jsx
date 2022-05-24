import React, {useEffect, useRef, useState} from "react";


let reqPage = 0;
let res = [];

const ScrollDownLoader = (props) => {
    const downScroll = useRef(null);

    useEffect(() => {
        reqPage = 0;
        props?.loadNextPage(0);

        downScroll?.current?.addEventListener("scroll", scrollLoad);

        return () => {
            downScroll?.current?.removeEventListener("scroll", scrollLoad);
            res = [];
        }
    }, []);



    useEffect(() => {
        res = props?.data;
    }, [props.data]);


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
            reqPage = reqPage + (res?.length > 0 ? 1: 0);
        }
        props?.loadNextPage(reqPage);
    }

    return (
        <div ref={downScroll} style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
            {props.children}
        </div>
    );
}

export default ScrollDownLoader;