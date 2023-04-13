import React from "react";
import { useSelector } from "react-redux";
import Announcement from "../Announcement";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TopLine = ({ currentPage }) => {
  const { locale, announcement } = useSelector((state) => state.menu);
  const { t } = useTranslation();

  return (
    <div className="menuHeader">
      {announcement[locale] && <Announcement text={announcement[locale]} />}
      <div className={"menuHeader__content"}>
        <p className={"menuHeader__title"}>{currentPage}</p>
        <Link to={"/"} className="menuHeader__button">
          {t("toMenu")}
        </Link>
      </div>
    </div>
  );
};

export default TopLine;
