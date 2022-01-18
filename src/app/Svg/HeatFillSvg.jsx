import React from "react";

export default function HeartFillSvg({onClick, w, h, color}) {
    return (
        <div onClick={onClick}>
            <svg width={w || 28} height={h || 28} fill={color || 'blue'}  viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
        </div>
    )
}
