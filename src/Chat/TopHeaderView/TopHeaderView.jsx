import React from 'react';
import {useDispatch} from "react-redux";


function TopHeaderView (props)  {
    const dispatch = useDispatch();

    function click(e) {

    }

    return (
        <div className="TopHeaderViewWrapper">
            <h2 onClick={click} className="text-center">Chat Messanger</h2>
        </div>
    );
}


export default TopHeaderView;
