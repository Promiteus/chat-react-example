import React, {useEffect, useState} from "react";
import {Drawer} from "@mui/material";

/**
 * Понимающаяся снизу панель для размещения произвольного контента
 * @param isOpen
 * @param onClosed
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const BottomDrawer = ({isOpen, onClosed, children}) => {
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
                {children}
            </Drawer>
        </div>
    );
}

export default BottomDrawer;