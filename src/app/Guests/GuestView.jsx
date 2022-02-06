import React, {useEffect} from "react";
import {Box, Chip, ImageList } from "@mui/material";
import ProfileViewElement from "./ProfileViewElement";
import './index.css'
import {CAPTION_EMPTY_GUESTS} from "../Constants/TextMessagesRu";
import useWindowDimensions, {D_LG, D_MD, D_SM, D_XL, D_XS} from "../Hooks/useWindowDimension";

let imgCols = 5;

const GuestsView = ({visitors}) => {
    const {width, dimType} = useWindowDimensions();
    const colsMap = new Map([
        [D_XS, 2],
        [D_SM, 2],
        [D_MD, 3],
        [D_LG, 5],
        [D_XL, 6],
    ]);

    useEffect(() => {
        imgCols = colsMap.get(dimType);
    }, [dimType]);

    return (
            <div style={{overflowY: 'scroll'}} className="d-block m-1 p-1 h-100">
                {visitors?.length ?
                    <ImageList cols={imgCols}>
                        {visitors?.map(elem => (
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