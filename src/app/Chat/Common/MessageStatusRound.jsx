import React from "react";

const styles = {
    badge: {
        borderRadius: 8,
        height: 8,
        backgroundColor: "#70b0f1",
        display: "block",
        padding: 4
    },
}

const MessageStatusRound = ({isRead}) => {
    return(
        <div>
            {isRead ?
                <div className="hidden"></div>
                :
                <div style={styles.badge}></div>
            }
        </div>
    );
}

export default MessageStatusRound;