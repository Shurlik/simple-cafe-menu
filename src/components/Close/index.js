import React from "react";
import "./style.scss";

const Close = ({onClick}) => {

    return (
        <div className={'close__wrapper'} {...{onClick}}>
            <div className={'close close__1'}/>
            <div className={'close close__2'}/>
        </div>
    )
}

export default Close
