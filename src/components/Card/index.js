import React from "react";
import "./style.scss";
import NoImage from "../../assets/images/empty.svg";
import Peppers from "../Peppers";
import PriceWeight from "../Price&Weight";
import NA from "../NotAvailable";
import { toggleModal } from "../../store/slices/menu";
import { useDispatch, useSelector } from "react-redux";
import FavoriteCardIcon from "../FavoriteCardIcon";

export default function Card({ item, setModalImage }) {
  const {
    index,
    title,
    price,
    price1,
    price2,
    price3,
    weight,
    weight1,
    weight2,
    weight3,
    hot,
    available,
    description,
    image,
    unit,
  } = item;
  const { locale } = useSelector((state) => state.menu);

  const dispatch = useDispatch();

  const imageClickHandler = () => {
    if (!image) {
      return;
    }
    setModalImage(image);
    dispatch(toggleModal());
  };

  return (
    <div className="card" onClick={imageClickHandler}>
      {!available && <NA />}
      <div className="card__image">
        {image ? (
          <img src={image} className="card__image--pic" alt="" />
        ) : (
          <img src={NoImage} className="card__image--pic" alt="" />
        )}
        <div className={"card__title--top"}>
          <div className="card__title ct--t1">
            <div className="card__title--index">{index}</div>
            <div className="card__title--name">{title[locale]}</div>
          </div>
        </div>
      </div>
      <div className="card__text-zone">
        <div className="ct--t2">
          <div className="card__title--index">{index}</div>
          {title[locale] && (
            <div className="card__title--name">{title[locale]}</div>
          )}
        </div>
        <p className="card__text">{description[locale]}</p>
        <div className="card__bottom">
          <Peppers level={hot} />
          <PriceWeight {...{ price, weight, unit }} />
          {price1 && (
            <PriceWeight price={price1} weight={weight1} {...{ unit }} />
          )}
          {price2 && (
            <PriceWeight price={price2} weight={weight2} {...{ unit }} />
          )}
          {price3 && (
            <PriceWeight price={price3} weight={weight3} {...{ unit }} />
          )}
        </div>
      </div>
      <FavoriteCardIcon {...{ index }} />
    </div>
  );
}
