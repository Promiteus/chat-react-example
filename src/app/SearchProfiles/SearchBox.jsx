import React, {useState} from "react";
import {Button, Divider, Grid, Typography} from "@mui/material";
import {
    CakeOutlined,
    ChildCare,
    Face,
    FamilyRestroom,
    RoundaboutLeft, SearchOutlined
} from "@mui/icons-material";
import {
    CAPTION_SEARCH,
    CAPTION_SEARCH_PARAMS,
    FAMILY_STATUS_DATA,
    KIDS_DATA,
    SEX_DATA, SEX_ORIENTATION_DATA,
    SUBTITLE_CHILDS, SUBTITLE_FAMILY_STATUS_SHORT,
    SUBTITLE_SEX,
    SUBTITLE_SEX_ORIENTATION, SUBTITLE_YEARS_OLD
} from "../Constants/TextMessagesRu";
import {ListField, RangeField} from "../Componetns/Controls";
import {useDispatch} from "react-redux";

/**
 {
  "kids": -1,
  "ageFrom": 0,
  "ageTo": 55,
  "sexOrientation": "HETERO",
  "meetPreferences": "ALL",
  "sex": "MAN",
  "familyStatus": null,
  "country": "Россия",
  "region": "",
  "locality": ""
}
 * */

let searchParams = {
    kids: -1,
    ageFrom: 18,
    ageTo: 55,
    sexOrientation: "HETERO",
    meetPreferences: "ALL",
    sex: "MAN",
    familyStatus: null,
    country: "Россия",
    region: "",
    locality: ""
};

/**
 * Контейнер с параметрами поиска профилей по SearchBox
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBox = ({onClose}) => {
    const search = useDispatch();


    function onSearch() {
        console.log(JSON.stringify(searchParams));
        //onClose();
    }

    return(
        <div className="d-flex flex-column container p-3">
             <div className="d-flex flex-row justify-content-end align-content-center">
                 <Button startIcon={<SearchOutlined/>} variant={"outlined"} onClick={onSearch}>
                     <Typography variant={"subtitle1"}>{CAPTION_SEARCH}</Typography>
                 </Button>
             </div>
             <Typography className="mb-2" variant={"h5"}>{CAPTION_SEARCH_PARAMS}</Typography>
             <Grid container className="mb-3">
                 <Grid item sm={12} xs={12} md={12} lg={12} xl={12} className="my-2">
                     <RangeField iconTitle={SUBTITLE_YEARS_OLD}
                                 icon={<CakeOutlined />}
                                 onChangeRange={(value) => {
                                     searchParams.ageFrom = value[0];
                                     searchParams.ageTo = value[1];
                                 }}
                                 defaultValue={[18, 50]}/>
                     <Divider className="mt-2"/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_CHILDS}
                                icon={<ChildCare />}
                                onSelectedItem={(value) => {searchParams.kids = value}}
                                defaultValue={'YES'}
                                data={KIDS_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_SEX}
                                icon={<Face />}
                                onSelectedItem={(value) => {searchParams.sex = value}}
                                defaultValue={'MAN'}
                                data={SEX_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_SEX_ORIENTATION}
                                icon={<RoundaboutLeft />}
                                onSelectedItem={(value) => {searchParams.sexOrientation = value}}
                                defaultValue={'HETERO'}
                                data={SEX_ORIENTATION_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_FAMILY_STATUS_SHORT}
                                icon={<FamilyRestroom />}
                                onSelectedItem={(value) => {searchParams.familyStatus = value}}
                                defaultValue={'MARRIED'}
                                data={FAMILY_STATUS_DATA.man}/>
                 </Grid>
             </Grid>
        </div>
    );
}

export default SearchBox;