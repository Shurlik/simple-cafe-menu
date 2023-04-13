import React, { useState } from "react";
import "./style.scss";
import NoImage from "../../../../assets/images/empty.svg";
import Edit from "./Edit";
import {useTranslation} from "react-i18next";

const Item = ({ item, category }) => {
    const [edit, setEdit] = useState(false);
    const editHandler = () => {
        setEdit(true);
    };
    const {t} = useTranslation()

    return (
      <div className="item">
        {edit && (
          <div className={"item__edit"}>
            <Edit editItem={item} cancel={() => setEdit(false)} />
          </div>
        )}
        <div className="item__image">
          {item.image ? (
            <img src={item.image} className="item__image--pic" alt="" />
          ) : (
            <img src={NoImage} className="item__image--pic" alt="" />
          )}
        </div>
        <div>
          <div className="item__data">
            <p className="item__index">
              <span className="item__simpleText">Індекс:</span> {item.index}
            </p>
            <p className="item__title">
              <span className="item__simpleText">Наіменування Укр:</span>{" "}
              {item.title.ua}
            </p>
            <p className="item__title">
              <span className="item__simpleText">Наіменування En:</span>{" "}
              {item.title.en}
            </p>
          </div>
          <p className="item__description">
            <span className="item__simpleText">Опис Укр:</span>{" "}
            {item.description.ua}
          </p>
          <p className="item__description">
            <span className="item__simpleText">Опис En:</span>{" "}
            {item.description.en}
          </p>
          <p className="item__category">
            <span className="item__simpleText">Категорія товару:</span>{" "}
            {category}
          </p>
          <div className="item__details">
            <p className="item__price">
              <span className="item__price--num item__simpleText">Ціна:</span>{" "}
              {item.price} грн.
            </p>
            <p className="item__price">
              <span className="item__price--num item__simpleText">Кількість:</span>{" "}
              {item.weight} {t(item.unit)}.
            </p>
            <p className="item__price">
              <span className="item__price--num item__simpleText">
                Гострота:
              </span>{" "}
              {item.hot === 3
                ? "Дуже гостре"
                : item.hot === 2
                ? "Гостре"
                : item.hot === 1
                ? "Трохи гостре"
                : "Не гостре"}
              .
            </p>
            <p className="item__price">
              <span className="item__price--num item__simpleText">
                Наявність:
              </span>{" "}
              <span className={item.available ? "item__av" : "item__nav"}>
                {item.available ? "Доступно" : "Немає"}.
              </span>
            </p>
          </div>
        </div>
        <div className="item__buttons">
          <span className="item__buttons--edit" onClick={editHandler}>
            Редагувати
          </span>
        </div>
      </div>
    );
};

export default Item;
