import "./style.scss";

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../../store/slices/menu";

const FavoritesCardIcon = ({ index }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.menu);

  const inFav = favorites.indexOf(index) !== -1;

  function clickHandler(e) {
    e.stopPropagation();

    if (inFav) {
      dispatch(setFavorites(favorites.filter((item) => item !== index)));
    } else {
      dispatch(setFavorites([...favorites, index]));
    }
  }

  return (
    <div className={"favCardIcon"} onClick={clickHandler}>
      <div className={"favCardIcon__content"}>
        {inFav ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>
    </div>
  );
};

export default FavoritesCardIcon;
