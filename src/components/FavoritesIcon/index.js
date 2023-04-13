import "./styles.scss";
import React from "react";
import { GiCrownedHeart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FavoritesIcon = () => {
  const { favorites } = useSelector((state) => state.menu);
  const navigate = useNavigate();

  function clickHandler() {
    navigate("/favorites");
  }

  return (
    <div className={"favIcon"}>
      <div className={"favIcon__wrapper"} onClick={clickHandler}>
        <GiCrownedHeart />
        <div className={"favIcon__counter"}>{favorites.length}</div>
      </div>
    </div>
  );
};

export default FavoritesIcon;
