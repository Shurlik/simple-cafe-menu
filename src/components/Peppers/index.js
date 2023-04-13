import React from "react";
import PepperImage from "../../assets/images/Pepper.svg";
import "./style.scss";

const Peppers = ({ level }) => {
  const peppers = [];
  for (let i = 0; i < level; i++) {
    peppers.push(
      <img src={PepperImage} className="pepper__image" alt="" key={i} />
    );
  }
  return <div className="pepper">{peppers}</div>;
};

export default Peppers;
