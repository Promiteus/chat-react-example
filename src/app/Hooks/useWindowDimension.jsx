import React, {useEffect, useState} from "react";


let dimType = 'md';

export const D_XS = 'sx';
export const D_SM = 'sm';
export const D_MD = 'md';
export const D_LG = 'lg';
export const D_XL = 'xl';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    const dims = [D_XS, D_SM, D_MD, D_LG, D_XL];

    if (width < 576) {
        dimType = dims[0];
    } else if ((width > 576) && (width < 768)) {
        dimType = dims[1];
    } else if ((width > 768) && (width < 992)) {
        dimType = dims[2];
    } else if ((width > 992) && (width < 1200)) {
        dimType = dims[3];
    } else if (width > 1200) {
        dimType = dims[4];
    }

    return {
        width,
        height,
        dimType,
    };
}

/**
 * // xs --- Extra small devices (portrait phones, less than 576px)
 // No media query since this is the default in Bootstrap

 // sm --- Small devices (landscape phones, 576px and up)
 @media (min-width: 576px) { ... }

 // md --- Medium devices (tablets, 768px and up)
 @media (min-width: 768px) { ... }

 // lg --- Large devices (desktops, 992px and up)
 @media (min-width: 992px) { ... }

 // xl --- Extra large devices (large desktops, 1200px and up)
 @media (min-width: 1200px) { ... }
 * */
/**
 * Хук получения размеров экрана
 * @returns {{dimType: string, width: number, height: number}}
 */
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}