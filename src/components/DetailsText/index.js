import React from "react";
import "./style.scss";

const DetailsText = ({ text }) => {
  return (
    <div className={"detailsText__container"}>
        <div className={"detailsText__text"}>{text}</div>
    </div>
  );
};
export default DetailsText;
