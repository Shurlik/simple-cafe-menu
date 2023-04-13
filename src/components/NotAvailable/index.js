import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";

const NA = () => {
  const { t } = useTranslation();
  return (
    <div className="na">
      <span className="na--text">{t('expect')}</span>
    </div>
  );
};

export default NA;
