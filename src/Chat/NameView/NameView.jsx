import React from 'react';
import {useSelector} from "react-redux";
import {selectCount} from "../../Stores/slices/CommonSlice";
import {selectUser} from "../../Stores/slices/UserSlice";


function NameView(props)
{
   // const counter = useSelector((state) => state);
    const count = useSelector(selectCount);


    return (
        <div className="NameViewWrapper bg-light border-bottom border-dark">
            Сообщений от user: {count}
        </div>
    )
}



export default NameView;
