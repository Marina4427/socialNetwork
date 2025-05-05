import { useTranslation } from "react-i18next";
import { IoMdSearch } from "react-icons/io";


const HeaderSearch = () => {
  const {t} = useTranslation();

  return (
    <label className="header__search">
      <span className="header__search-icon">
        <IoMdSearch />
      </span>
      <input
        className="header__search-field"
        type="text"
        placeholder={t('header.field')}
      />
    </label>
  );
};

export default HeaderSearch;
