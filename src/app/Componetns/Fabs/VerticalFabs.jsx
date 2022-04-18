import React from "react";
import IconFab from "./IconFab";

/**
 *
 * @param {json} fabStyle
 * @param {any[]} fabs
 * @returns {JSX.Element}
 * @constructor
 */
const VerticalFabs = ({fabStyle, fabs}) => {
    return (
        <div style={{...fabStyle}} className="d-flex flex-column align-items-center, align-content-center p-2">
            {fabs?.map(fab => (
                <div className="m-1">
                    <IconFab
                        icon={fab?.icon}
                        bgColor={fab?.bgColor}
                        ariaLabel={fab?.arialLabel}
                        iconColor={fab?.iconColor}
                        onClick={fab?.onClick}
                    />
                </div>
            ))}
        </div>
    );
}

export default VerticalFabs;