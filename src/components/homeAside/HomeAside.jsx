import React from "react";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdCameraEnhance } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";

const HomeAside = () => {
  const navigate = useNavigate();

  return (
    <aside className="aside">
      <ul className="aside__menu">
        <li className="aside__item" onClick={() => navigate("/myprofile")}>
          <BiUserCircle />
          My profile
        </li>
        <li className="aside__item" onClick={() => navigate("/friends")}>
          <HiOutlineUsers />
          Friends
        </li>
        <li className="aside__item" onClick={() => navigate("/photos")}>
          <MdCameraEnhance />
          Photos
        </li>
        <li className="aside__item" onClick={() => navigate("/notifications")}>
          <MdOutlineNotificationsActive />
          Notifications
        </li>
        <li className="aside__item" onClick={() => navigate("/requests")}>
          <IoMdPersonAdd />
          My requests
        </li>
      </ul>
    </aside>
  );
};

export default HomeAside;
