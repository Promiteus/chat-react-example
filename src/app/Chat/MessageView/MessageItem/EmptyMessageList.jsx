import React from "react";
import './index.css';
import {AnnouncementOutlined} from "@mui/icons-material";

const EmptyMessageList = (props) => {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <div className="message-badge d-flex flex-row justify-content-center align-items-center">
                <div className="mx-2"><AnnouncementOutlined color={"error"}/></div>
                <span>Здесь пока нет сообщений</span>
            </div>
        </div>
    );
}

export default EmptyMessageList;