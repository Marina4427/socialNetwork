import HeaderSearch from "./HeaderSearch";
import { IoNotifications } from "react-icons/io5";
import noUser from "../../assets/no-photo.jpg";
import { IoIosArrowDown } from "react-icons/io";
import SwitchLang from './SwitchLang/SwitchLang';

const Header = () => {

  
  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <div className="header__left">
            <h1 className="header__title">IT-RUN web</h1>
            <HeaderSearch />
          </div>

          <div className="header__right">
            <span className="header__notif">
              <IoNotifications />
            </span>
            <SwitchLang />
            <span className="header__user">
              <img src={noUser} alt="User photo not found" className="header__user-photo"/>
              <span className="header__user-icon"><IoIosArrowDown /></span>
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
