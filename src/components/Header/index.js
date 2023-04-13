import React, { useState } from "react";
import "./style.scss";
import Contacts from "../Contacts";
import Timetable from "../Timetable";
import WorkTimeImg from "../../assets/images/scheduler.svg";
import ContactsImg from "../../assets/images/contacts.svg";
import { useTranslation } from "react-i18next";
import Lang from "../Lang";
import FavoritesIcon from "../FavoritesIcon";

export default function Header() {
  const [currentShow, setCurrentShow] = useState("");
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="header__wrapper">
        <Timetable {...{ currentShow, setCurrentShow }} />
        <div className={"header__icon"} onClick={() => setCurrentShow("time")}>
          <img src={WorkTimeImg} alt={""} width={60} height={60} />
        </div>
        <div className={"header__main"}>
          <h1 className="header__title">{t("title")}</h1>
          <div className="menuHeader__lang">
            <Lang lang={"ua"} />
            <p className="header__menu">{t("menu")}</p>
            <Lang lang={"en"} />
          </div>
        </div>
        <Contacts {...{ currentShow, setCurrentShow }} />
        <div
          className={"header__icon"}
          onClick={() => setCurrentShow("contacts")}
        >
          <img src={ContactsImg} alt={""} width={48} height={48} />
        </div>
      </div>
      <FavoritesIcon />
    </div>
  );
}
