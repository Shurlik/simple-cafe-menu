import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const DisplayItem = ({ item }) => {
    const { index, title, description } = item;
    return (
        <div className="unavailable__item">
            <div className="unavailable__item--line">
                Індекс:&nbsp;
                <span className="unavailable__item--content">{index}</span>
            </div>
            <div className="unavailable__item--line">
                {title["ua"] || description["ua"]}
            </div>
        </div>
    );
};

const Unavailable = () => {
    const { menuItems, loading } = useSelector((state) => state.menu);
    const navigate = useNavigate();

    const toMenu = () => {
        navigate("/");
    };

    const selectedMenuList = menuItems.filter((item) => {
        return !item.available;
    });

    return (
        <>
            <div className="unavailable__exit" onClick={toMenu}>
                До меню
            </div>
            <div className={"unavailable__container"}>
                <h2 className="unavailable__title">Немає в наявності</h2>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="unavailable__list">
                        {selectedMenuList.map((item, key) => {
                            return <DisplayItem {...{ item, key }} />;
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Unavailable;
