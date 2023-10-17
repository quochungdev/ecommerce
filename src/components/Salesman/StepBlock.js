import React from "react";

export default function Step(props) {
    return (
        <div className={"stepBlock text-xl w-full" + (props.selected ? " selected " : "")}>
            <div className="circleWrapper items-center px-5  ">
                <div className="circle text-center transition duration-500 ease-in-out ">{props.index + 1}</div>
            </div>
            <span>{props.label}</span>
        </div>
    )
}