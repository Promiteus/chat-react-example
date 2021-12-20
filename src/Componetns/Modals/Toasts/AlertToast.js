import React, {useEffect, useState} from "react";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";

export function AlertToast({open, text, success}) {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const handleClose = (event, reason) => {
        console.log(reason);
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return(
        <div>
            <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}