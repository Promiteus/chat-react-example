import React from 'react';
import {useDispatch} from "react-redux";
import {setDefaultValue} from "../../Stores/slices/CommonSlice";


function TopHeaderView (props)  {
    const dispatch = useDispatch();

    function click(e) {
        dispatch(setDefaultValue(100));
    }

    return (
        <div className="TopHeaderViewWrapper">
            <h2 onClick={click} className="text-center">Chat Messanger</h2>
        </div>
    );
}


export default TopHeaderView;
