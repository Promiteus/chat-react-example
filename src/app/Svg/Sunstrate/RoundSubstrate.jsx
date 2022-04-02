import React, {useEffect, useRef} from "react";

let substrateWidth = 24;

/**
 * Компонент-подложка (круглая) для иконки
 * @param width
 * @param color
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const RoundSubstrate = ({color, children}) => {
    const substrateRef = useRef();

    useEffect(() => {
        substrateWidth = substrateRef?.current?.clientWidth*1.1;
    }, [])

    return (
        <div ref={substrateRef}
             style={{ backgroundColor: color, borderRadius: substrateWidth}}
             className="flex-row p-1 justify-content-center align-content-center h-100">
            {children}
        </div>
    );
}

export default RoundSubstrate;