import React from "react";
import "./style.scss";
import Insta from "../../assets/images/insta.svg";
import GMaps from "../../assets/images/google-maps.svg";
import Phone from "../../assets/images/phone.svg";
import Car from "../../assets/images/redCar.svg";
import Close from "../Close";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Contacts = ({ currentShow, setCurrentShow }) => {
  const { t } = useTranslation();

  return (
    <div
      className={
        currentShow === "contacts" ? "contacts contacts__show" : "contacts"
      }
    >
      <div className={"contacts__close"}>
        <Close onClick={() => setCurrentShow("")} />
      </div>
      <p className="contacts__title">{t("contacts")}</p>
      <p>
        <a href="tel:+380936908298" className="contacts__phone">
          <img src={Phone} alt="" width={24} height={24} />
          &nbsp;+380 (93) 690-82-98&nbsp;
        </a>
      </p>
      <p>
        <a
          href="https://www.google.com.ua/maps/place/%D0%A5%D0%B0%D0%BD+%D0%AE%D1%83%D0%B0%D0%BD/@50.4402546,30.4348295,19.52z/data=!4m5!3m4!1s0x0:0x50283b11df0724fd!8m2!3d50.440216!4d30.4350507"
          target={"blank"}
          className="contacts__maps"
        >
          <img src={GMaps} alt="" width={24} height={24} />
          &nbsp;{t("address")}&nbsp;
        </a>
      </p>
      <p>
        <a
          href="https://www.instagram.com/haniuuan/?hl=ru"
          target={"blank"}
          className="contacts__insta"
        >
          <img src={Insta} alt="" width={24} height={24} />
          &nbsp;{t("insta")}&nbsp;
        </a>
      </p>
      <p>
        <Link
          to={"delivery"}
          className="contacts__delivery"
          onClick={() => setCurrentShow("")}
        >
          <img src={Car} alt="" height={21} />
          &nbsp;{t("delivery")}&nbsp;
        </Link>
      </p>
    </div>
  );
};

export default Contacts;
