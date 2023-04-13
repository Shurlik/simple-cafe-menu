import React from "react";
import nf from "../../assets/images/404.webp";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const NotFound = () => {
  const navigate = useNavigate();
  const returnHandler = () => {
    navigate("/");
  };

  return (
    <div className="nf">
      <div className="nf__text">Тут нічого нема...((((</div>
      <div className="nf__img">
        <img src={nf} alt="empty page" />
      </div>
      <button className="nf__button" onClick={returnHandler}>
        Повернутись до смаколиків
      </button>
    </div>
  );
};

export default NotFound;
