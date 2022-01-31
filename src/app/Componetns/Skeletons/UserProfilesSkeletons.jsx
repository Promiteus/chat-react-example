import React, {useEffect, useState} from "react";
import {ImageList, ImageListItem} from "@mui/material";
import useWindowDimensions, {D_LG, D_MD, D_SM, D_XL, D_XS} from "../../Hooks/useWindowDimension";
import {Skeleton} from "@mui/lab";

const UserProfilesSkeletons = ({count}) => {
    const {dimType} = useWindowDimensions();
    const [imgCols, setImgCols] = useState(5);
    const colsMap = new Map([
        [D_XS, 2],
        [D_SM, 2],
        [D_MD, 3],
        [D_LG, 5],
        [D_XL, 6],
    ]);

    function getItems() {
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push(i);
        }
        return items;
    }

    useEffect(() => {
        setImgCols(colsMap.get(dimType));
    }, [dimType]);

    return(
        <ImageList cols={imgCols}>
            {getItems().map((i, key) => (
                <ImageListItem key={key} className="m-1">
                    <Skeleton variant="rectangular"  height={220} />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default UserProfilesSkeletons;