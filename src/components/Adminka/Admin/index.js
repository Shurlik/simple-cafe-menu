import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../../store/slices/user";
import { useFirebase } from "../../../hooks/useFirebase";
import Item from "./Item";
import Loader from "../../Loader";
import { setAnnouncement } from "../../../store/slices/menu";
import { categoryUA } from "../../../constants";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const { menuItems, announcement } = useSelector((state) => state.menu);
  const { updateFbAnnouncement } = useFirebase();

  const [loading, setLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [newAnnouncementUa, setNewAnnouncementUa] = useState(announcement.ua);
  const [newAnnouncementEn, setNewAnnouncementEn] = useState(announcement.en);
  const [messEdit, setMessEdit] = useState(false);
  const [sortByAvailable, setSortByAvailable] = useState();
  const [val, setVal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredItems(menuItems);
  }, [menuItems]);

  const selectItemsByCategory = (catIndex) => {
    setLoading(true);
    setVal(catIndex);
    if (!catIndex) {
      setFilteredItems(menuItems);
    } else {
      const selected = menuItems.filter((item) => item.category === catIndex);
      setFilteredItems(selected);
    }
    setLoading(false);
  };

  const updateAnnouncement = async () => {
    await updateFbAnnouncement({
      en: newAnnouncementEn,
      ua: newAnnouncementUa,
    });
    dispatch(
      setAnnouncement({
        en: newAnnouncementEn,
        ua: newAnnouncementUa,
      })
    );
  };

  useEffect(() => {
    if (val) {
      selectItemsByCategory(val);
    }
    // eslint-disable-next-line
  }, [menuItems]);

  const logout = () => {
    dispatch(removeToken());
    navigate("/");
  };
  const toMenu = () => {
    navigate("/");
  };

  return (
    <div className="admin">
      <div className={"admin__buttons"}>
        <div className="admin__exit" onClick={logout}>
          Вихід
        </div>
        <div className="admin__exit" onClick={toMenu}>
          До меню
        </div>
      </div>
      <p className="admin__title">Admin panel</p>
      <div className="admin__content">
        <p className="admin__announcement">
          Повідомлення на сайті Укр:{" "}
          <input
            className="admin__announcement--text"
            disabled={!messEdit}
            value={newAnnouncementUa}
            onChange={(event) => setNewAnnouncementUa(event.target.value)}
          />
        </p>
        <p className="admin__announcement">
          Повідомлення на сайті En:{" "}
          <input
            className="admin__announcement--text"
            disabled={!messEdit}
            value={newAnnouncementEn}
            onChange={(event) => setNewAnnouncementEn(event.target.value)}
          />
        </p>
        <span
          className="admin__announcement--edit"
          onClick={async () => {
            if (messEdit) {
              await updateAnnouncement();
            }
            setMessEdit(!messEdit);
          }}
        >
          {messEdit ? "Зберегти повідомлення" : "Редагувати повідомлення"}
        </span>

        <div className="admin__search">
          <div className="admin__search--type">
            Категорія:{" "}
            <select
              name={"category"}
              onChange={(event) =>
                selectItemsByCategory(parseInt(event.target.value))
              }
            >
              {categoryUA.map((_, key) => {
                return (
                  <option value={key + 1} key={key}>
                    {categoryUA[key]}
                  </option>
                );
              })}
              <option value={undefined} defaultValue>{"Усі"}</option>
            </select>
          </div>{" "}
          <div className="admin__search--type">
            Сортування по наявності:{" "}
            <select
              name={"available"}
              onChange={(event) => {
                setSortByAvailable(parseInt(event.target.value));
              }}
            >
              <option value={undefined}>Без сортування</option>
              <option value={0}>Спочатку " Немає"</option>
              <option value={1}>Спочатку "В наявності"</option>
            </select>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          [...filteredItems]
            .sort((a, b) => {
              if (sortByAvailable === 0) {
                return a.available - b.available;
              }
              if (sortByAvailable === 1) {
                return b.available - a.available;
              }
              return a.index - b.index;
            })
            .map((item, key) => {
              return (
                <Item
                  category={categoryUA[item.category - 1]}
                  {...{ item, key }}
                />
              );
            })
        )}
      </div>
    </div>
  );
};

export default Admin;
