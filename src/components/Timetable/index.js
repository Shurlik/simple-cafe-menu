import React from "react";
import "./style.scss";
import Close from "../Close";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Timetable = ({ currentShow, setCurrentShow }) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        currentShow === "time" ? "timetable timetable__show" : "timetable"
      }
    >
      <div className={"timetable__close"}>
        <Close onClick={() => setCurrentShow("")} />
      </div>
      <p className="timetable__title">{t("workTime")}</p>
      <p className="timetable__time">{t("fromTo")}</p>
      <p className="timetable__week">{t("weekdays")}</p>
      <p className="timetable__order">
        {t("order")}: <span className="timetable__order--to">{t("till")}</span>
      </p>
      <p className="timetable__about">
        <Link
          to={"about"}
          className="timetable__about--link"
          onClick={() => setCurrentShow("")}
        >
          {t("about")}
        </Link>
      </p>
    </div>
  );
};

export default Timetable;
