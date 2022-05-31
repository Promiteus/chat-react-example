import React, {useEffect, useRef, useState} from "react";
import {LinearProgress, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {incPage, selectScrollLoader, setPage} from "../../Stores/slices/ScrollLoaderSlice";

let cPage = 0;
let res = [];

const ScrollDownLoader = (props) => {
    const downScroll = useRef(null);
    const dispatch = useDispatch();
    //const {page} = useSelector(selectScrollLoader);

    useEffect(() => {
        downScroll?.current?.addEventListener("scroll", scrollLoad);

        return () => {
            downScroll?.current?.removeEventListener("scroll", scrollLoad);
            res = [];
        }
    }, []);

    useEffect(() => {cPage = props?.page}, [props?.page]);
    useEffect(() => { res = props?.data}, [props?.data]);

    function scrollLoad() {
        if ((downScroll?.current?.scrollTop + downScroll?.current?.clientHeight+1) >= downScroll?.current?.scrollHeight) {
             loadMore();
        }
    }

    /**
     * Выполняется для подрузки данных постранично при прокрутке вниз
     */
    function loadMore() {
        if ((props?.loading === false)) {
            if (cPage === 0) {
                dispatch(incPage());
            } else if ((cPage > 0) && (props?.status === 200)) {
                dispatch(setPage(cPage + (res?.length > 0 ? 1: 0)));
            }
        }
    }

    return (
        <div className="d-flex flex-column h-100 position-relative">
            <div ref={downScroll} style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
                {props.children}
            </div>
            {props?.loading ?
            <Stack sx={{ width: '100%', color: 'grey.500', height: 4}} spacing={2}>
                <LinearProgress color="success" />
            </Stack> : <div className="w-100" style={{height: 4}}></div>}
        </div>

    );
}

export default ScrollDownLoader;