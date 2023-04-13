import React from "react";
import "./style.scss";

const Announcement = ({text}) => {

    return (
        <div className={"ann"}>
            <span className={'ann__info'}>!!! {text} !!!</span>
        </div>
    )
}

export default Announcement;
