import React, {useEffect, useState} from "react";
import {Checkbox, FormControl, Grid, Slider} from "@mui/material";
import IconSubTitle from "../Header/IconSubTitle";


function valuetext(value) {
    return `${value}`;
}

/**
 * Компанент числового диапазона от и до
 * @param defaultValue
 * @param icon
 * @param iconTitle
 * @param onChangeRange
 * @returns {JSX.Element}
 * @constructor
 */
const RangeField = ({defaultValue, icon, iconTitle, onChangeRange, onChecked, isChecked}) => {
    const [value, setValue] = useState(defaultValue);
    const [check, setCheck] = useState(isChecked);

    useEffect(() => {
        if (!check) {
            onChangeRange([null, null]);
        }
        onChecked(check);
    }, [check]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const onKeyUp = (event) => {
        onChangeRange(value);
    }

    return(
        <div className="d-flex flex-row justify-content-start align-items-center">
            <Checkbox checked={isChecked} onChange={(e) => {
                setCheck(e?.target?.checked);
                if (!check) {
                    onChangeRange(value)
                }}}/>
            <div className="d-flex flex-row justify-content-start align-items-center">
                <IconSubTitle text={iconTitle} icon={icon} font={'h6'} dataText={`(от ${value[0]} до ${value[1]})`}/>
            </div>

            <Grid container>
                <Grid item md={4} lg={4} sm={12} xs={12}>
                    <FormControl variant="standard" fullWidth>
                        <Slider
                            disabled={!check}
                            getAriaLabel={() => 'Age range'}
                            value={value}
                            min={18}
                            onChange={handleChange}
                            onMouseUp={onKeyUp}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}

export default RangeField;