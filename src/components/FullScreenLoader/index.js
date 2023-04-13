import React from "react";
import "./style.scss";
import Loader from "../Loader";

const FullScreenLoader = () => {
  return (
    <div className={"fsLoaderWrapper"}>
      <Loader />
    </div>
  );
};

export default FullScreenLoader;
