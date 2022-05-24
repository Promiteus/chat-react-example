import React, {useEffect, useRef, useState} from "react";
import {LinearProgress, Stack} from "@mui/material";


let reqPage = 0;
let res = [];

const ScrollDownLoader = (props) => {
    const downScroll = useRef(null);
    const [loading, setLoading] = useState(props?.loading);


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

    useEffect(() => {
        setLoading(props?.loading);
    }, [props?.loading]);



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
        <div className="d-flex flex-column h-100">
            <div ref={downScroll} style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
                {props.children}
            </div>
            {loading ?
            <Stack sx={{ width: '100%', color: 'grey.500', height: 4}} spacing={2}>
                <LinearProgress color="success" />
            </Stack> : <div className="w-100" style={{height: 4}}></div>}
        </div>

    );
}

export default ScrollDownLoader;