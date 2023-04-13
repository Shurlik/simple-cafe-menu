import React from "react";
import "./style.scss";
import Content from "../Content";
import { useSelector } from "react-redux";
import { categoryEN, categoryUA } from "../../constants.js";
import TopLine from "../TopLine";

export default function Body({ index }) {
  const { locale } = useSelector((state) => state.menu);
  const categoryList = locale === "ua" ? categoryUA : categoryEN;

  return (
    <>
      <TopLine currentPage={categoryList[index]} />
      <div className="body__wrapper">
        <Content {...{ index }} />
      </div>
    </>
  );
}
