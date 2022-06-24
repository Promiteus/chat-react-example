
import React from "react";
import {Box} from "@mui/material";
import './index.css';

function TabItem(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className="tab-view"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="p-1 h-100">
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabItem;