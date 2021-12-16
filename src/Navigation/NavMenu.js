import React from "react";
import {Link} from "react-router-dom";
import './NavMenu.css'

export default function NavMenu(props) {
    return (
        <div>
            <nav className="border-bottom border-1 m-2 p-2">                
                <Link to="/signin">Вход</Link>
                <Link to="/registration">Регистрация</Link>
                <Link to="/profile-prim">Профиль этап 1</Link>
                <Link to="/profile-sec">Профиль этап 2</Link>
                <Link to="/">Чат</Link>
            </nav>
        </div>
    )
}