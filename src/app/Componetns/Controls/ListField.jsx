import React, {useEffect, useState} from "react";
import IconSubTitle from "../Header/IconSubTitle";
import {Checkbox, FormControl, Grid, MenuItem, Select} from "@mui/material";

const ListField = ({data, defaultValue, icon, iconTitle, onSelectedItem}) => {
    const [value, setValue] = useState(getSelectedValue(defaultValue));
    const [check, setCheck] = useState(true);

    function onSelect(e) {
        let selectedTag = e?.target?.value;
        onSelectedItem(e?.target?.value);
        setValue(getSelectedValue(selectedTag));
    }

    useEffect(() => {
        if (!check) {
            onSelectedItem(null);
        }
    }, [check]);

    function getSelectedValue(selectedTag) {
        if (data?.length > 0) {
            return ((data.filter(elem => (elem?.tag === selectedTag))[0])?.value);
        }
        return '';
    }

    return(
        <div className="d-flex flex-row justify-content-start align-items-center">
            <Checkbox defaultChecked onChange={(e) => {setCheck(e?.target?.checked)}}/>
            <div className="d-flex flex-row justify-content-start align-items-center">
                <IconSubTitle text={iconTitle} icon={icon} font={'h6'}/>
            </div>

            <Grid container>
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <FormControl variant="standard" fullWidth>
                        <Select
                            disabled={!check}
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

export default ListField;