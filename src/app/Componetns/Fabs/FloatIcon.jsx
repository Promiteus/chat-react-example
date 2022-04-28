import React from "react";
import './index.css';

/**
 *
 * @param {json} fabStyle
 * @param {JSX.Element} icon
 * @param {string} caption
 * @param {string} color
 * @param {any} onClick
 * @returns {JSX.Element}
 * @constructor
 */
const FloatIcon = ({fabStyle, icon, caption, color, onClick}) => {
    return (
          <div
              onClick={onClick}
              style={{...fabStyle, backgroundColor: 'white', borderRadius: 50}}
              className="substrate d-flex flex-row justify-content-center align-items-center">
                 {icon} <span style={{fontWeight: 'bold', color:  color || 'red'}}>{caption.toUpperCase() || ''}</span>
          </div>
    );
}

export default FloatIcon;