import React, {useState} from "react";
import {Container, FormControl, Grid, IconButton, MenuItem, Select, Typography} from "@mui/material";
import IconSubTitle from "../Componetns/Header/IconSubTitle";
import {ChildCare, Face, FamilyRestroom, HistoryToggleOffOutlined, ModeEdit, RoundaboutLeft} from "@mui/icons-material";
import {
    FAMILY_STATUS_DATA,
    KIDS_DATA,
    SEX_DATA, SEX_ORIENTATION_DATA,
    SUBTITLE_CHILDS, SUBTITLE_FAMILY_STATUS,
    SUBTITLE_SEX,
    SUBTITLE_SEX_ORIENTATION
} from "../Constants/TextMessagesRu";



const ListField = ({data, defaultValue, icon, iconTitle, onSelectedItem}) => {
    const [value, setValue] = useState(getSelectedValue(defaultValue));

    function onSelect(e) {
        let selectedTag = e?.target?.value;
        onSelectedItem(e?.target?.value);
        setValue(getSelectedValue(selectedTag));
    }

    function getSelectedValue(selectedTag) {
        if (data?.length > 0) {
            return ((data.filter(elem => (elem?.tag === selectedTag))[0])?.value);
        }
        return '';
    }

    return(
        <div className="d-flex flex-row justify-content-start">
            <div className="d-flex flex-row justify-content-start align-items-center">
                <IconSubTitle text={iconTitle} icon={icon} font={'h6'}/>
            </div>

            <Grid container>
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <FormControl variant="standard" fullWidth>
                        <Select
                            defaultValue={defaultValue}
                            onChange={onSelect}>
                            {data.map((elem, key) =>
                                <MenuItem key={key} value={elem?.tag}>{elem?.value}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}


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

/**
 * Контейнер с параметрами поиска профилей по SearchBox
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const SearchBox = (props) => {


    return(
        <div className="d-flex flex-column container p-3">
             <Grid container>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_CHILDS}
                                icon={<ChildCare />}
                                onSelectedItem={(value) => {}}
                                defaultValue={'YES'}
                                data={KIDS_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_SEX}
                                icon={<Face />}
                                onSelectedItem={(value) => {}}
                                defaultValue={'MAN'}
                                data={SEX_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField iconTitle={SUBTITLE_SEX_ORIENTATION}
                                icon={<RoundaboutLeft />}
                                onSelectedItem={(value) => {}}
                                defaultValue={'HETERO'}
                                data={SEX_ORIENTATION_DATA}/>
                 </Grid>
                 <Grid item sm={12} xs={12} md={6} lg={6} xl={6} className="my-2">
                     <ListField  iconTitle={SUBTITLE_FAMILY_STATUS}
                                 icon={<FamilyRestroom />}
                                 onSelectedItem={(value) => {}}
                                 defaultValue={'MARRIED'}
                                 data={FAMILY_STATUS_DATA.man}/>
                 </Grid>
             </Grid>
        </div>
    );
}

export default SearchBox;