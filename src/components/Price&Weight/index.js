import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";

const PriceWeight = ({ price, weight, unit }) => {
  const { t } = useTranslation();
  return (
    <div className="pw">
      <span className="pw__price">
        {price}&nbsp;{t("currency")}.
      </span>
      {weight && (
        <>
          <span className="pw__divide">&nbsp;/&nbsp;</span>
          <span className="pw__weight">{weight}</span>
          <span className="pw__unit">&nbsp;{t(unit)}.</span>
        </>
      )}
    </div>
  );
};

export default PriceWeight;
