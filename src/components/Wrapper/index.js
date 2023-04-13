import React from "react";
import "./style.scss";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Wrapper = () => {
    const { t } = useTranslation();
    return (
        <div className="wrapper">
            <div className="header__sale">
                <div className="header__sale--blue">{t("defenders")}</div>
                <div className="header__sale--yellow">
                    {t("sale", { percent: 10 })}
                </div>
            </div>
            <Header />
            <Outlet />
        </div>
    );
};

export default Wrapper;
