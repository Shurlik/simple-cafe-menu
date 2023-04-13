import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import DetailsText from "../DetailsText";
import TopLine from "../TopLine";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const { t } = useTranslation();

  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
  };

  return (
    <>
      <TopLine currentPage={t("about")} />
      <DetailsText text={t("aboutDetails")} />
          <Slider {...settings}  className={"about__sliderContainer"}>
          <div className={"about__image"}>
            <img src={require("../../assets/images/slider/1.webp")} alt="" />
          </div>
          <div className={"about__image"}>
            <img src={require("../../assets/images/slider/2.webp")} alt="" />
          </div>
          <div className={"about__image"}>
            <img src={require("../../assets/images/slider/3.webp")} alt="" />
          </div>
          <div className={"about__image"}>
            <img src={require("../../assets/images/slider/4.webp")} alt="" />
          </div>
        </Slider>
    </>
  );
};

export default About;
