import React, { useState } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { t } = useTranslation();
  const [orderList, setOrderList] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  const { menuItems, locale, favorites } = useSelector((state) => state.menu);

  const orderHandler = async () => {
    setIsCopied(false);
    let messageToSend = `${t("code")}\t   ${t("quantity")}\t   ${t(
      "dish"
    )}\n\n`;
    for (const item in orderList) {
      if (orderList[item] === 0) {
        continue;
      }
      const elem = menuItems.find(
        (el) => el.index.toString() === item.toString()
      );
      messageToSend =
        messageToSend +
        item +
        "\t   " +
        orderList[item] +
        "\t   " +
        `${elem?.title[locale] || elem?.description[locale]}` +
        "\n";
    }
    try {
      copy(messageToSend);
      setIsCopied(true);
    } catch (e) {
      console.log("Copy text error: ", e);
      setIsCopied(true);
    }
  };

  const resetCopy = () => {
    if (isCopied) {
      setIsCopied(false);
    }
  };

  const CartItem = ({ item }) => {
    const increaseHandler = () => {
      orderList[item.index] += 1;
      setOrderList({ ...orderList });
    };
    const decreaseHandler = () => {
      if (orderList[item.index] > 0) {
        orderList[item.index] -= 1;
        setOrderList({ ...orderList });
      }
    };
    return (
      <div className={"shopping__item"}>
        <p className={"shopping__item--unit unit__index"}>{item.index}</p>
        <p className={"shopping__item--unit unit__title"}>
          {item.title[locale] || item.description[locale]}
        </p>
        <div className={"shopping__counters"}>
          <p
            className={"shopping__item--unit unit__plusminus"}
            onClick={decreaseHandler}
          >
            -
          </p>
          <p className={"shopping__item--unit unit__count"}>
            {orderList[item.index]}
          </p>
          <p
            className={"shopping__item--unit unit__plusminus"}
            onClick={increaseHandler}
          >
            +
          </p>
        </div>
      </div>
    );
  };

  const favItems = menuItems
    .filter((item) => favorites.indexOf(item.index) !== -1 && item.available)
    .sort();

  return (
    <div className={"shopping"}>
      <Link
        to={"/"}
        className="shopping__orderButton shopping__orderButton--menu"
      >
        {t("toMenu")}
      </Link>
      <h3 className={"shopping__info"}>{t("orderInfo")}</h3>
      <div className={"shopping__content"} onClick={resetCopy}>
        {favItems.map((item, index) => {
          if (!orderList[item.index] && orderList[item.index] !== 0) {
            orderList[item.index] = 0;
          }
          return <CartItem key={index} {...{ item }} />;
        })}
      </div>
      <div
        className={`shopping__orderButton ${
          isCopied ? "shopping__orderButton--copied" : ""
        }`}
        onClick={orderHandler}
      >
        {isCopied ? t("copied") : t("copyOrder")}
      </div>
      <a
        className={"shopping__orderButton"}
        href="viber://chat?number=%2B380936908298"
        onClick={() => setIsCopied(false)}
      >
        {t("toViber")}
      </a>
    </div>
  );
};

export default ShoppingCart;
