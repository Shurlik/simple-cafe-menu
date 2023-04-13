import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import Card from "../Card";
import Modal from "../Modal";
import Loader from "../Loader";
import TopLine from "../TopLine";
import { useTranslation } from "react-i18next";
import OrderIcon from "../OrderIcon";

export default function Content({ index, favs }) {
  const { t } = useTranslation();
  const [modalImage, setModalImage] = useState();
  const { menuItems, loading, favorites } = useSelector((state) => state.menu);
  let selectedMenuList = [];

  if (index || index === 0) {
    selectedMenuList = menuItems.filter((item) => {
      return item.category === index + 1;
    });
  }

  if (favs) {
    selectedMenuList = menuItems
      .filter((item) => favorites.indexOf(item.index) !== -1)
      .sort();
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {favs && <TopLine currentPage={t("favorites")} />}
      <div className="content">
        {loading ? (
          <Loader />
        ) : (
          <div className="content__wrapper">
            {selectedMenuList.map((item, key) => {
              return <Card {...{ item, key, setModalImage }} />;
            })}
          </div>
        )}
        <Modal {...{ modalImage }} />
        {favs && <OrderIcon />}
      </div>
    </>
  );
}
