import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import Taxi from "../../assets/animations/taxi-lotti.json";
import DetailsText from "../DetailsText";
import TopLine from "../TopLine";

const Delivery = () => {
  const { t } = useTranslation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Taxi,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <TopLine currentPage={t("delivery")} />
      <DetailsText text={t("deliveryDetails")} />
      <div className={"delivery__taxi"}>
        <Lottie options={defaultOptions} width={400} height={140} />
      </div>
    </>
  );
};

export default Delivery;
