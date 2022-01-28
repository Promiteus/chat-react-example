import React, {useEffect, useState} from "react";
import {Drawer} from "@mui/material";

const BottomDrawer = ({isOpen, onClosed}) => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const toggleDrawer = (stat) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        onClosed();
        setOpen(stat);
    };

    return(
        <div className="">
            <Drawer
                anchor={"bottom"}
                open={open}
                onClose={toggleDrawer(false)}>
                {'test'}
            </Drawer>
        </div>
    );
}

export default BottomDrawer;