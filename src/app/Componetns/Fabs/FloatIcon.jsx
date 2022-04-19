import React from "react";

/**
 *
 * @param {json} fabStyle
 * @param {JSX.Element} icon
 * @returns {JSX.Element}
 * @constructor
 */
const FloatIcon = ({fabStyle, icon}) => {
    return (
          <div style={{...fabStyle}}>
              {icon}
          </div>
    );
}

export default FloatIcon;