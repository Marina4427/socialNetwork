import HeaderSearch from "./HeaderSearch";
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import SwitchLang from "./SwitchLang/SwitchLang";
import { Avatar } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { IoMdColorPalette } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

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

            <Popover placement="top-end" isLazy >
              <PopoverTrigger>
                <Button className="header__user">
                  <Avatar
                    className="header__user-photo"
                    bg="teal.300"
                    name="Marina Fi"
                    src=""
                  />
                  <span className="header__user-icon">
                    <IoIosArrowDown />
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent bg="black" className="header__popover-content">
                <PopoverArrow />

                <div className="header__popover">
                  <div className="header__popover-top">
                    <Avatar
                      bg="teal.300"
                      name="Marina Fi"
                      src=""
                      className="header__popover-img"
                    />
                    <div>
                      <h3 className="header__popover-title">Marina Fill</h3>
                      <p className="header__popover-num"> +952-123-45-69</p>
                    </div>
                  </div>
                  <ul className="header__popover-list">
                    <li className="header__popover-item">
                      <Icon as={IoMdSettings} />
                      Настройки
                    </li>
                    <li className="header__popover-item">
                      <Icon as={IoMdColorPalette} />
                      Тема
                    </li>
                    <li className="header__popover-item">
                      <Icon as={MdLanguage} />
                      <SwitchLang />
                    </li>

                    <li className="header__popover-item">
                      <Icon as={IoIosLogOut} />
                      Выйти
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
