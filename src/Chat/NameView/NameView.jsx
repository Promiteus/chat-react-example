import React from 'react';
import {useSelector} from "react-redux";
import {selectCount} from "../../Stores/slices/CommonSlice";

function NameView(props)
{
    const count = useSelector(selectCount);

    return (
        <div className="NameViewWrapper bg-light border-bottom border-dark">
            Сообщений от user: {count}
        </div>
    )
}

export default NameView;
