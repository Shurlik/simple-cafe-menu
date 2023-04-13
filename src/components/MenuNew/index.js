import React from "react";
import "./style.scss";
import { categoryEN, categoryUA, menuLink } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory, setShowMenu } from "../../store/slices/menu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Announcement from "../Announcement";
import FullScreenLoader from "../FullScreenLoader";

const MenuNew = () => {
  const { locale, announcement, loading } = useSelector((state) => state.menu);
  const menu = locale === "ua" ? categoryUA : categoryEN;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeHandler = (index) => {
    localStorage.setItem("index", index);
    dispatch(selectCategory(index));
  };

  return (
    <>
      <div className="menuHeader">
        {announcement[locale] && <Announcement text={announcement[locale]} />}
        <p className={"menuHeader__menuText"}>{t("chose")}</p>
      </div>
      <div className="newMenu__main">
        {menu.map((item, index) => (
          <Link
            to={menuLink[index]}
            key={index}
            className="newMenu__cell"
            onClick={() => {
              activeHandler(index);
              dispatch(setShowMenu(false));
              localStorage.removeItem("showMenu");
            }}
          >
            <div className="newMenu__title">{item}</div>
          </Link>
        ))}
      </div>
      {loading && <FullScreenLoader />}
    </>
  );
};

export default MenuNew;
