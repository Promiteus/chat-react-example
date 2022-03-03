import React from "react";
import {Check} from "@mui/icons-material";

/**
 * Иконка галочки о прочитанном сообщении
 * @param {boolean} isRead
 * @returns {JSX.Element}
 * @constructor
 */
const MessageStatus = ({isRead}) => {
    return (
        <div className="d-flex justify-content-end flex-row align-items-center">
            {isRead ?
                <Check sx={{color: 'blue'}}/>
                :
                <Check sx={{color: 'gray'}}/>
            }
        </div>
    );
}

export default MessageStatus;