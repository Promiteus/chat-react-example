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

/*let searchParams = {
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
};*/

/**
 * Контейнер с параметрами поиска профилей по SearchBox
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBox = ({onClose, defaultParams}) => {
    const [searchParams, setSearchParams] = useState(defaultParams || {
        kids: 'YES',
        ageFrom: 18,
        ageTo: 55,
        sexOrientation: "HETERO",
        meetPreferences: "ALL",
        sex: "MAN",
        familyStatus: null,
        country: "Россия",
        region: "",
        locality: ""
    })

    function onSearch() {
        onClose(searchParams);
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
                                     setSearchParams(prevState => ({...prevState, ageFrom: value[0]}));
                                     setSearchParams(prevState => ({...prevState, ageTo: value[1]}));
                                 }}
                                 defaultValue={[defaultParams?.ageFrom || 18, defaultParams?.ageTo || 50]}/>
                     <Divider className="mt-2"/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_CHILDS}
                                icon={<ChildCare />}
                                onSelectedItem={(value) => {setSearchParams(prevState => ({...prevState, kids: value}));}}
                                defaultValue={defaultParams?.kids || 'YES'}
                                data={KIDS_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_SEX}
                                icon={<Face />}
                                onSelectedItem={(value) => {setSearchParams(prevState => ({...prevState, sex: value}));}}
                                defaultValue={defaultParams?.sex || 'MAN'}
                                data={SEX_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_SEX_ORIENTATION}
                                icon={<RoundaboutLeft />}
                                onSelectedItem={(value) => {setSearchParams(prevState => ({...prevState, sexOrientation: value}));}}
                                defaultValue={defaultParams?.sexOrientation || 'HETERO'}
                                data={SEX_ORIENTATION_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_FAMILY_STATUS_SHORT}
                                icon={<FamilyRestroom />}
                                onSelectedItem={(value) => {setSearchParams(prevState => ({...prevState, familyStatus: value}));}}
                                defaultValue={defaultParams?.familyStatus || 'MARRIED'}
                                data={FAMILY_STATUS_DATA.man}/>
                 </Grid>
             </Grid>
        </div>
    );
}

export default SearchBox;