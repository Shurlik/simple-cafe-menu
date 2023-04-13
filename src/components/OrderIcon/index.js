import React from "react";
import "./style.scss";
import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

const OrderIcon = () => {
  return (
    <Link className={"orderIcon"} to={"/shopping"}>
      {/*<p className={"orderIcon__test"}>TEST</p>*/}
      <AiFillShopping />
    </Link>
  );
};

export default OrderIcon;
