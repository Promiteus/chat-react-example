import React from "react";

export default function LeftChevron({onClick, w, h, color}) {
    return (
        <div onClick={onClick} className="m-0 p-0">
            <svg width={w || 28} height={h || 28} fill={color || 'blue'}  viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>
            </svg>
        </div>
    )
}

