import React from 'react';
import {useNavigate} from "react-router-dom"
import {BiUserCircle} from "react-icons/bi"
import {HiOutlineUsers} from "react-icons/hi"

const HomeAside = () => {
    const navigate = useNavigate()
    
    return (
        <aside className="aside">
            <ul className="aside__menu">
                <li className="aside__item" onClick={() => navigate('/myprofile')}>
                    <BiUserCircle/>
                    My profile
                </li>
                <li className="aside__item" onClick={() => navigate('/friends')}>
                    <HiOutlineUsers/>
                    Friends
                </li>
            </ul>
        </aside>
    );
};

export default HomeAside;