import { IoMdSearch } from "react-icons/io";

const HeaderSearch = () => {
  return (
    <label className="header__search">
      <span className="header__search-icon">
        <IoMdSearch />
      </span>
      <input
        className="header__search-field"
        type="text"
        placeholder="Поиск"
      />
    </label>
  );
};

export default HeaderSearch;
